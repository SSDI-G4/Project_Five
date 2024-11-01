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
}

export default UserPhotos;
