import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useHistory, Link, useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person"; // New user logo icon
import "./userPhotos.css";
import axios from "axios";
import { ChatBubbleOutline } from "@mui/icons-material";
import moment from "moment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function UserPhotos(props) {
  const history = useHistory();
  const [photosData, setPhotosData] = useState([]);
  const [userData, setUserData] = useState();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/photosOfUser/" + props.match.params.userId)
      .then((res) => setPhotosData(res.data))
      .then(() => setPageLoaded(true))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/user/" + props.match.params.userId)
      .then((res) => {
        setUserData(res.data);
        props.setTitle(`Photos of ${res?.data?.first_name} ${res?.data?.last_name}`);
      })
      .catch((err) => console.log(err));
  }, [props.match.params.userId]);

  const addComment = (event, photo) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const comment = data.get("comment");
    axios
      .post("http://localhost:3000/commentsOfPhoto/" + photo._id, { comment })
      .then((res) => {
        setPhotosData((prev) => {
          const newPhotosData = [...prev];
          const photoIndex = newPhotosData.findIndex((photoData) => photoData._id === photo._id);
          newPhotosData[photoIndex].comments.push(res.data);
          return newPhotosData;
        });
        event.target.reset();
      })
      .catch((err) => console.log(err));
  };


  const location = useLocation();

  useEffect(() => {
    if (pageLoaded) {
      const queryParams = new URLSearchParams(location.search);
      const imageId = queryParams.get("imageId");
      const element = document.getElementById(imageId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.search, pageLoaded]);

  const redirectToUser = (id) => history.push("/users/" + id);

  return (
    <Box padding={2}>
      {photosData.length > 0 ? (
        photosData.map((photo, index) => (
          <Box key={index} marginTop={5}>
            <Stack direction="row" gap={1} paddingBottom={2}>
              {/* Replacing Avatar with PersonIcon */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "lightgray",
                }}
              >
                <PersonIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography fontSize={18}>
                  {userData?.first_name} {userData?.last_name}
                </Typography>
                <Typography variant="body2" fontSize={12}>
                  {moment(photo?.date_time).format("MMMM Do YYYY")} at {moment(photo?.date_time).format("h:mm a")}
                </Typography>
              </Box>
            </Stack>
            <Box bgcolor="black" display="flex" justifyContent="center" borderRadius={2}>
              <div id={photo?.file_name}>
                <img src={`../../images/${photo?.file_name}`} className="main-image" />
              </div>
            </Box>
            <Box padding={2}>
              <Box component="form" noValidate onSubmit={(event) => addComment(event, photo)} marginBottom={5}>
                <Typography fontSize={18} fontWeight={300}>
                  Add a new comment:
                </Typography>
                <TextField fullWidth variant="outlined" placeholder="Write a comment" id="comment" name="comment" autoComplete="comment" />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  Add Comment
                </Button>
              </Box>
              {photo?.comments?.length ? (
                photo?.comments?.map((comment, commentIndex) => (
                  <Stack key={commentIndex} direction="row" gap={1} paddingY={1}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "lightgray",
                        cursor: "pointer",
                      }}
                      onClick={() => redirectToUser(userData._id)}
                    >
                      <PersonIcon sx={{ fontSize: 12 }} />
                    </Box>
                    <Box>
                      <Typography fontWeight={300}>
                        <Link to={"/users/" + comment.user._id} className="main-username">
                          {comment?.user?.first_name}&nbsp;
                          {comment?.user?.last_name}
                        </Link>
                        &nbsp;{comment.comment}
                      </Typography>
                      <Typography variant="body2" fontSize={11} color="GrayText">
                        {comment?.date_time}
                      </Typography>
                    </Box>
                  </Stack>
                ))
              ) : (
                <Typography fontSize={12} fontWeight={300} color="gray" textAlign="center" paddingY={2}>
                  No comments found
                </Typography>
              )}
            </Box>
            {index !== (photosData?.length || 0) - 1 && <Divider />}
          </Box>
        ))
      ) : (
        <Typography variant="h6" textAlign="center">
          No photos found
        </Typography>
      )}
    </Box>
  );
}

export default UserPhotos;