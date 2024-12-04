<<<<<<< HEAD
// import { Button, Typography, Box, Avatar } from "@mui/material";
// import { useHistory } from "react-router-dom";
// import "./userDetail.css";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function UserDetail(props) {
//   function stringToColor(string) {
//     let hash = 0;
//     let i;
//     /* eslint-disable no-bitwise */
//     for (i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     let color = "#";
//     for (i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       color += `00${value.toString(16)}`.slice(-2);
//     }
//     /* eslint-enable no-bitwise */
//     return color;
//   }
//   const [userData, setUserData] = useState();
//   const [recentPhoto, setRecentPhoto] = useState();
//   const [mostComments, setMostComments] = useState();
//   const history = useHistory();
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/user/" + props.match.params.userId)
//       .then((res) => {
//         setUserData(res.data);
//         props.setTitle(`${res?.data?.first_name} ${res?.data?.last_name}`);
//       })
//       .catch((err) => console.log(err));
//     axios
//       .get("http://localhost:3000/photos/latest/" + props.match.params.userId)
//       .then((res) => {
//         setRecentPhoto(res.data);
//       })
//       .catch((err) => console.log(err));
//     axios
//       .get("http://localhost:3000/photos/most-comments/" + props.match.params.userId)
//       .then((res) => {
//         setMostComments(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [props.match.params.userId]);

//   console.log(recentPhoto, mostComments, "RECENT PHOTO");
//   return (
//     <Box>
//       <Avatar sx={{ bgcolor: stringToColor(`${userData?.first_name?.[0]}${userData?.last_name?.[0]}`), width: 100, height: 100, fontSize: 40 }}>
//         {userData?.first_name?.[0]}
//         {userData?.last_name?.[0]}
//       </Avatar>
//       <Typography fontSize={30}>{userData?.first_name}&apos;s Profile</Typography>
//       <Typography>First Name: {userData?.first_name}</Typography>
//       <Typography>Last Name: {userData?.last_name}</Typography>
//       <Typography>Occupation: {userData?.occupation}</Typography>
//       <Typography>Location: {userData?.location}</Typography>
//       <Typography>Description: {userData?.description}</Typography>
//       {userData?._id && (
//         <Button variant="contained" onClick={() => history.push("/photos/" + userData._id)} sx={{ marginTop: "12px" }}>
//           See {userData?.first_name} {userData?.last_name}&apos;s photos
//         </Button>
//       )}
//       <Box sx={{ width: "100%", borderTop: "1px solid gray", paddingTop: "20px", display: "flex", flexDirection: "row", marginTop: "20px" }}>
//         {recentPhoto && (
//           <Box sx={{ width: "50%", cursor: "pointer" }} onClick={() => history.push("/photos/" + props.match.params.userId + "?imageId=" + (recentPhoto?.file_name || ""))}>
//             <Box sx={{ width: "400px", height: "100%", display: "flex", flexDirection: "column" }}>
//               <Typography>Recent Photo</Typography>
//               <Box sx={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
//                 <img src={`../../images/${recentPhoto?.file_name}`} alt="recent" className="main-image" />
//               </Box>
//             </Box>
//             <Box display="flex" flexDirection="row" alignItems="center" gap={1} marginTop={2}>
//               <ChatBubbleOutlineIcon /> <Typography sx={{ marginRight: 3 }}>{recentPhoto?.comments?.length}</Typography>
//               <FavoriteBorderIcon /> <Typography>{recentPhoto?.liked_by?.length || 0}</Typography>
//             </Box>
//           </Box>
//         )}
//         {mostComments && (
//           <Box sx={{ width: "50%", cursor: "pointer" }} onClick={() => history.push("/photos/" + props.match.params.userId + "?imageId=" + (mostComments?.file_name || ""))}>
//             <Box sx={{ width: "400px", height: "100%", display: "flex", flexDirection: "column" }}>
//               <Typography>Most Comments</Typography>
//               <Box sx={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
//                 <img src={`../../images/${mostComments?.file_name}`} alt="most comments" className="main-image" />
//               </Box>
//             </Box>
//             <Box display="flex" flexDirection="row" alignItems="center" gap={1} marginTop={2}>
//               <ChatBubbleOutlineIcon /> <Typography sx={{ marginRight: 3 }}>{mostComments?.comments?.length}</Typography>
//               <FavoriteBorderIcon /> <Typography>{mostComments?.liked_by?.length || 0}</Typography>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default UserDetail;


import { Button, Typography, Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person"; // New icon
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDetail(props) {
  const [userData, setUserData] = useState();
  const [recentPhoto, setRecentPhoto] = useState();
  const [mostComments, setMostComments] = useState();
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/" + props.match.params.userId)
      .then((res) => {
        setUserData(res.data);
        props.setTitle(`${res?.data?.first_name} ${res?.data?.last_name}`);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/photos/latest/" + props.match.params.userId)
      .then((res) => {
        setRecentPhoto(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/photos/most-comments/" + props.match.params.userId)
      .then((res) => {
        setMostComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.match.params.userId]);

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Profile Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
        <PersonIcon sx={{ fontSize: 100, color: "gray" }} /> {/* New profile icon */}
        <Box>
          <Typography fontSize={30}>{userData?.first_name}&apos;s Profile</Typography>
          <Typography>First Name: {userData?.first_name}</Typography>
          <Typography>Last Name: {userData?.last_name}</Typography>
          <Typography>Occupation: {userData?.occupation}</Typography>
          <Typography>Location: {userData?.location}</Typography>
          <Typography>Description: {userData?.description}</Typography>
          {userData?._id && (
            <Button
              variant="contained"
              onClick={() => history.push("/photos/" + userData._id)}
              sx={{ marginTop: "12px" }}
            >
              See {userData?.first_name} {userData?.last_name}&apos;s photos
            </Button>
          )}
        </Box>
      </Box>

      {/* Photos Section */}
      {/* <Box
        sx={{
          width: "100%",
          borderTop: "1px solid gray",
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column", // Vertical stacking
          gap: "20px", // Spacing between the items
          marginTop: "20px",
        }}
      >
        {recentPhoto && (
          <Box
            sx={{
              width: "100%", // Full width
              cursor: "pointer",
            }}
            onClick={() =>
              history.push(
                "/photos/" + props.match.params.userId + "?imageId=" + (recentPhoto?.file_name || "")
              )
            }
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>Recent Photo</Typography>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                }}
              >
                <img
                  src={`../../images/${recentPhoto?.file_name}`}
                  alt="recent"
                  className="main-image"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={1}
              marginTop={2}
            >
              <ChatBubbleOutlineIcon />{" "}
              <Typography sx={{ marginRight: 3 }}>
                {recentPhoto?.comments?.length}
              </Typography>
              <FavoriteBorderIcon />{" "}
              <Typography>{recentPhoto?.liked_by?.length || 0}</Typography>
            </Box>
          </Box>
        )}
        {mostComments && (
          <Box
            sx={{
              width: "100%", // Full width
              cursor: "pointer",
            }}
            onClick={() =>
              history.push(
                "/photos/" +
                  props.match.params.userId +
                  "?imageId=" +
                  (mostComments?.file_name || "")
              )
            }
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>Most Comments</Typography>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                }}
              >
                <img
                  src={`../../images/${mostComments?.file_name}`}
                  alt="most comments"
                  className="main-image"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={1}
              marginTop={2}
            >
              <ChatBubbleOutlineIcon />{" "}
              <Typography sx={{ marginRight: 3 }}>
                {mostComments?.comments?.length}
              </Typography>
              <FavoriteBorderIcon />{" "}
              <Typography>{mostComments?.liked_by?.length || 0}</Typography>
            </Box>
          </Box>
        )}
      </Box> */}
      <Box
        sx={{
          width: "100%",
          borderTop: "1px solid gray",
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column", // Vertical stacking
          gap: "20px", // Spacing between the items
          marginTop: "20px",
        }}
      >
        {recentPhoto && (
          <Box
            sx={{
              width: "100%", // Full width
              cursor: "pointer",
            }}
            onClick={() => history.push("/photos/" + props.match.params.userId + "?imageId=" + (recentPhoto?.file_name || ""))}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>Recent Photo</Typography>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                }}
              >
                <img
                  src={`../../images/${recentPhoto?.file_name}`}
                  alt="recent"
                  className="main-image"
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" gap={1} marginTop={2}>
              <ChatBubbleOutlineIcon />
              <Typography sx={{ marginRight: 3 }}>{recentPhoto?.comments?.length}</Typography>

              {/* Like Button */}
              <FavoriteBorderIcon />
              <Typography>{recentPhoto?.liked_by?.length || 0}</Typography>

              {/* Favorite Button */}
              <BookmarkBorderIcon />
              <Typography>{recentPhoto?.favorited_by?.length || 0}</Typography>
            </Box>
          </Box>
        )}
        {mostComments && (
          <Box
            sx={{
              width: "100%", // Full width
              cursor: "pointer",
            }}
            onClick={() => history.push("/photos/" + props.match.params.userId + "?imageId=" + (mostComments?.file_name || ""))}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>Most Comments</Typography>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                }}
              >
                <img
                  src={`../../images/${mostComments?.file_name}`}
                  alt="most comments"
                  className="main-image"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={1}
              marginTop={2}
            >
              <ChatBubbleOutlineIcon />
              <Typography sx={{ marginRight: 3 }}>{mostComments?.comments?.length}</Typography>

              {/* Like Button */}
              <FavoriteBorderIcon />
              <Typography>{mostComments?.liked_by?.length || 0}</Typography>

              {/* Favorite Button */}
              <BookmarkBorderIcon />
              <Typography>{mostComments?.favorited_by?.length || 0}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default UserDetail;
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import './userDetail.css';
import axios from 'axios';


class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true, 
      error: null 
    };
  }

  componentDidMount() {
    this.loadUserDetails();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.loadUserDetails();
    }
  }

  loadUserDetails() {
    const userId = this.props.match.params.userId;
    const url = `/user/${userId}`; 

    axios.get(url)
      .then(response => {
        this.setState({ user: response.data, loading: false }); 
      })
      .catch(err => {
        this.setState({ error: err, loading: false }); 
      });
  }

  render() {
    const { user, loading, error } = this.state; 

    if (loading) {
      return (
        <Grid container justifyContent="center" style={{ height: '100vh' }}>
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Grid>
      ); 
    }

    if (error) {
      return (
        <Grid container justifyContent="center" style={{ height: '100vh' }}>
          <Typography color="error">Error: {error.statusText}</Typography>
        </Grid>
      ); 
    }

    return (
      <Grid container justifyContent="flex-start" style={{ padding: '20px' }}>
        <Grid item xs={12} md={8} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {user.first_name} {user.last_name}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                <strong>Location:</strong> {user.location}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                <strong>Occupation:</strong> {user.occupation}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                <strong>Description:</strong> {user.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/photos/${user._id}`}
                style={{ marginTop: '16px' }}
              >
                View Photos
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default UserDetail;
>>>>>>> f7771d4aa7fc7fccb65a53461bc89c08c4a7b745
