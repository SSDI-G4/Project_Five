<<<<<<< HEAD
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

  const onLikeClick = (photo) => {
    axios
      .post("http://localhost:3000/photos/like/" + photo._id)
      .then((res) => {
        setPhotosData((prev) => {
          const newPhotosData = [...prev];
          const photoIndex = newPhotosData.findIndex((photoData) => photoData._id === photo._id);
          newPhotosData[photoIndex].liked_by = res.data;
          return newPhotosData;
        });
      })
      .catch((err) => console.log(err));
  };

  const onFavoriteClick = (photo) => {
    axios
      .post("http://localhost:3000/photos/favorite/" + photo._id)
      .then((res) => {
        setPhotosData((prev) => {
          const newPhotosData = [...prev];
          const photoIndex = newPhotosData.findIndex((photoData) => photoData._id === photo._id);
          newPhotosData[photoIndex].favorited_by = res.data;
          return newPhotosData;
        });
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
            <Box display="flex" flexDirection="row" alignItems="center" gap={1} marginTop={2}>
              <ChatBubbleOutline /> <Typography sx={{ marginRight: 3 }}>{photo?.comments?.length}</Typography>
              <Box onClick={() => onLikeClick(photo)} sx={{ cursor: "pointer" }}>
                {photo?.liked_by?.includes(props.userId) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </Box>{" "}
              <Typography>{photo?.liked_by?.length || 0}</Typography>
              <Box
                onClick={() => {
                  onFavoriteClick(photo);
                }}
                sx={{ cursor: "pointer", marginLeft: 3 }}
              >
                {photo?.favorited_by?.includes(props.userId) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </Box>{" "}
              <Typography>{photo?.favorited_by?.length || 0}</Typography>
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
=======
// import React from 'react';
// import {
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   Link,
//   Box
// } from '@mui/material';
// import './userPhotos.css';
// import axios from 'axios';


// class UserPhotos extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       photos: [],
//       loading: true, 
//       error: null 
//     };
//   }

//   componentDidMount() {
//     const userId = this.props.match.params.userId; 
//     const url = `/photosOfUser/${userId}`; 

//     axios.get(url)
//       .then(response => {
//         this.setState({ photos: response.data, loading: false }); 
//       })
//       .catch(err => {
//         this.setState({ error: err, loading: false }); 
//       });
//   }

//   render() {
//     const { photos, loading, error } = this.state; 
//     const userId = this.props.match.params.userId; 

//     if (loading) {
//       return <Typography variant="body1">Loading photos...</Typography>; 
//     }

//     if (error) {
//       return <Typography variant="body1">No Photos {error.statusText}</Typography>; 
//     }

//     return (
//       <Box>
//         {photos.length > 0 ? (
//           photos.map((photo) => (
//             <Card key={photo._id} sx={{ marginBottom: 2 }}>
//               <CardMedia
//                 component="img"
//                 alt={`Photo of ${userId}`}
//                 width="140"
//                 image={`images/${photo.file_name}`}
//               />
//               <CardContent>
//                 <Typography variant="body2" color="text.secondary">
//                   Created on: {new Date(photo.date_time).toLocaleString()}
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   Comments:
//                 </Typography>
//                 {photo.comments && photo.comments.length > 0 ? (
//                 photo.comments.map((comment) => (
//                 comment._id ? (  
//                     <Box
//                       key={comment._id}
//                       sx={{
//                         marginBottom: 1,
//                         padding: 1,
//                         backgroundColor: '#f5f5f5',
//                         borderRadius: 1
//                       }}
//                     >
//                        <Typography
//                         variant="caption"
//                         sx={{
//                           display: 'block',
//                           fontWeight: 'bold',
//                           marginBottom: '0.5rem',
//                           color: '#4a4a4a',
//                         }}
//                       >
//                         <Link
//                           href={"#/users/" + comment.user._id}
//                           underline="hover"
//                           sx={{
//                             color: '#1976d2',
//                             textDecoration: 'none',
//                             '&:hover': {
//                               textDecoration: 'underline',
//                             }
//                           }}
//                         >
//                           {`${comment.user.first_name} ${comment.user.last_name}`}
//                         </Link>
//                         : {comment.comment}
//                        </Typography>
//                       <Typography variant="caption" sx={{ color: '#757575' }}>
//                         (on {new Date(comment.date_time).toLocaleString()})
//                       </Typography>
//                     </Box>
//                   ) : (
//                     <Typography variant="caption" key={comment._id}>
//                       Comment details missing.
//                     </Typography>
//                   )
//                 ))
//               ) : (
//                 <Typography variant="caption">No comments available.</Typography>
//               )}
//               </CardContent>
//             </Card>
//         ))
//       ) : (
//         <Typography variant="body1">No photos available for this user.</Typography>
//       )}
//       </Box>
//     );
//   }
// }

// export default UserPhotos;


// import React from 'react';
// import {
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   Link,
//   Box,
//   TextField,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle
// } from '@mui/material';
// import './userPhotos.css';
// import axios from 'axios';

// class UserPhotos extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       photos: [],
//       loading: true,
//       error: null,
//       newComments: {},
//       openDialog: false,
//       selectedPhotoId: null,
//     };
//   }
  
//   componentDidMount() {
//     const userId = this.props.match.params.userId;
//     const url = `/photosOfUser/${userId}`;

//     axios.get(url)
//       .then(response => {
//         this.setState({ photos: response.data, loading: false });
//       })
//       .catch(err => {
//         this.setState({ error: err, loading: false });
//       });
//   }

//   handleCommentChange = (photoId, value) => {
//     this.setState(prevState => ({
//       newComments: {
//         ...prevState.newComments,
//         [photoId]: value,
//       }
//     }));
//   };

//   handleOpenDialog = (photoId) => {
//     this.setState({ openDialog: true, selectedPhotoId: photoId });
//   };

//   handleCloseDialog = () => {
//     this.setState({ openDialog: false, selectedPhotoId: null });
//   };

//   submitComment = async () => {
//     const { selectedPhotoId, newComments } = this.state;
//     const commentText = newComments[selectedPhotoId];

    

//     try {
//       const response = await axios.post(`/commentsOfPhoto/${selectedPhotoId}`, { comment: commentText });
//       const newComment = response.data;

//       if (!newComment || !newComment._id) {
//         console.error("Invalid comment response:", newComment);
//         return; // Exit if the response does not contain a valid comment
//       }

//       this.setState(prevState => ({
//         photos: prevState.photos.map(photo => {
//           if (photo._id === selectedPhotoId) {
//             return { 
//               ...photo, 
//               comments: [...(photo.comments || []), newComment],
//             };
//           }
//           return photo;
//         }),
//         newComments: {
//           ...prevState.newComments,
//           [selectedPhotoId]: '',
//         },
//         openDialog: false,
//         selectedPhotoId: null
//       }));
//     } catch (error) {
//       console.error("Failed to submit comment:", error);
//     }
//   };
  
//   render() {
//     const { photos, loading, error, newComments, openDialog, selectedPhotoId } = this.state;
//     const userId = this.props.match.params.userId;

//     if (loading) {
//       return <Typography variant="body1">Loading photos...</Typography>;
//     }

//     if (error) {
//       return <Typography variant="body1">Error: {error.message}</Typography>;
//     }

//     return (
//       <Box>
//         {photos.length > 0 ? (
//           photos.map((photo) => (
//             <Card key={photo._id} sx={{ marginBottom: 2 }}>
//               <CardMedia
//                 component="img"
//                 alt={`Photo of ${userId}`}
//                 width="140"
//                 image={`images/${photo.file_name}`}
//               />
//               <CardContent>
//                 <Typography variant="body2" color="text.secondary">
//                   Created on: {new Date(photo.date_time).toLocaleString()}
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   Comments:
//                 </Typography>
//                 {photo.comments && photo.comments.length > 0 ? (
//                   photo.comments.map((comment) => (
//                     <Box
//                       key={comment._id || Math.random()} // Fallback for rendering issues
//                       sx={{
//                         marginBottom: 1,
//                         padding: 1,
//                         backgroundColor: '#f5f5f5',
//                         borderRadius: 1
//                       }}
//                     >
//                       {comment.user ? (
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             display: 'block',
//                             fontWeight: 'bold',
//                             marginBottom: '0.5rem',
//                             color: '#4a4a4a',
//                           }}
//                         >
//                           <Link
//                             href={`#/users/${comment.user._id}`}
//                             underline="hover"
//                             sx={{
//                               color: '#1976d2',
//                               textDecoration: 'none',
//                               '&:hover': {
//                                 textDecoration: 'underline',
//                               }
//                             }}
//                           >
//                             {`${comment.user.first_name} ${comment.user.last_name}`}
//                           </Link>
//                           : {comment.comment}
//                         </Typography>
//                       ) : (
//                         <Typography variant="caption">
//                           {comment.comment || 'Comment details missing.'}
//                         </Typography>
//                       )}
//                       <Typography variant="caption" sx={{ color: '#757575' }}>
//                         (on {new Date(comment.date_time).toLocaleString()})
//                       </Typography>
//                     </Box>
//                   ))
//                 ) : (
//                   <Typography variant="caption">No comments available.<br/></Typography>
//                 )}

//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   onClick={() => this.handleOpenDialog(photo._id)}
//                   sx={{ marginTop: 1 }}
//                 >
//                   Add Comment
//                 </Button>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography variant="body1">No photos available for this user.</Typography>
//         )}

//         {/* Comment Dialog */}
//         <Dialog open={openDialog} onClose={this.handleCloseDialog}>
//           <DialogTitle>Add a Comment</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Your comment"
//               value={selectedPhotoId ? newComments[selectedPhotoId] || '' : ''}
//               onChange={(e) => this.handleCommentChange(selectedPhotoId, e.target.value)}
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={4}
//               sx={{ marginTop: 2 }}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleCloseDialog} color="secondary">
//               Cancel
//             </Button>
//             <Button onClick={this.submitComment} color="primary" variant="contained">
//               Submit
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     );
//   }
// }

// export default UserPhotos;



import React from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Link,
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import './userPhotos.css';
import axios from 'axios';

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: true,
      error: null,
      newComments: {},
      openDialog: false,
      selectedPhotoId: null,
    };
  }
  
  componentDidMount() {
    const userId = this.props.match.params.userId;
    const url = `/photosOfUser/${userId}`;

    axios.get(url)
      .then(response => {
        // Check if the response data is an empty array
        if (Array.isArray(response.data) && response.data.length === 0) {
          this.setState({ photos: [], loading: false });
        } else {
          this.setState({ photos: response.data, loading: false });
        }
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  }

  handleCommentChange = (photoId, value) => {
    this.setState(prevState => ({
      newComments: {
        ...prevState.newComments,
        [photoId]: value,
      }
    }));
  };

  handleOpenDialog = (photoId) => {
    this.setState({ openDialog: true, selectedPhotoId: photoId });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false, selectedPhotoId: null });
  };

  submitComment = async () => {
    const { selectedPhotoId, newComments } = this.state;
    const commentText = newComments[selectedPhotoId];

    try {
      const response = await axios.post(`/commentsOfPhoto/${selectedPhotoId}`, { comment: commentText });
      const newComment = response.data;

      if (!newComment || !newComment._id) {
        console.error("Invalid comment response:", newComment);
        return; // Exit if the response does not contain a valid comment
      }

      this.setState(prevState => ({
        photos: prevState.photos.map(photo => {
          if (photo._id === selectedPhotoId) {
            return { 
              ...photo, 
              comments: [...(photo.comments || []), newComment],
            };
          }
          return photo;
        }),
        newComments: {
          ...prevState.newComments,
          [selectedPhotoId]: '',
        },
        openDialog: false,
        selectedPhotoId: null
      }));
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };
  
  render() {
    const { photos, loading, error, newComments, openDialog, selectedPhotoId } = this.state;
    const userId = this.props.match.params.userId;

    if (loading) {
      return <Typography variant="body1">Loading photos...</Typography>;
    }

    if (error) {
      return <Typography variant="body1">Error: {error.message}</Typography>;
    }

    return (
      <Box>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <Card key={photo._id} sx={{ marginBottom: 2 }}>
              <CardMedia
                component="img"
                alt={`Photo of ${userId}`}
                width="140"
                image={`images/${photo.file_name}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Created on: {new Date(photo.date_time).toLocaleString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Comments:
                </Typography>
                {photo.comments && photo.comments.length > 0 ? (
                  photo.comments.map((comment) => (
                    <Box
                      key={comment._id || Math.random()} // Fallback for rendering issues
                      sx={{
                        marginBottom: 1,
                        padding: 1,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 1
                      }}
                    >
                      {comment.user ? (
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            color: '#4a4a4a',
                          }}
                        >
                          <Link
                            href={`#/users/${comment.user._id}`}
                            underline="hover"
                            sx={{
                              color: '#1976d2',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              }
                            }}
                          >
                            {`${comment.user.first_name} ${comment.user.last_name}`}
                          </Link>
                          : {comment.comment}
                        </Typography>
                      ) : (
                        <Typography variant="caption">
                          {comment.comment || 'Comment details missing.'}
                        </Typography>
                      )}
                      <Typography variant="caption" sx={{ color: '#757575' }}>
                        (on {new Date(comment.date_time).toLocaleString()})
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="caption">No comments available.<br/></Typography>
                )}

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.handleOpenDialog(photo._id)}
                  sx={{ marginTop: 1 }}
                >
                  Add Comment
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No Photos available for this user.</Typography>
        )}

        {/* Comment Dialog */}
        <Dialog open={openDialog} onClose={this.handleCloseDialog}>
          <DialogTitle>Add a Comment</DialogTitle>
          <DialogContent>
            <TextField
              label="Your comment"
              value={selectedPhotoId ? newComments[selectedPhotoId] || '' : ''}
              onChange={(e) => this.handleCommentChange(selectedPhotoId, e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              sx={{ marginTop: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.submitComment} color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
>>>>>>> f7771d4aa7fc7fccb65a53461bc89c08c4a7b745
}

export default UserPhotos;
