import React from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Link,
  Box
} from '@mui/material';
import './userPhotos.css';
import fetchModel from '../../lib/fetchModelData'; 

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: true, 
      error: null 
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId; 
    const url = `/photosOfUser/${userId}`; 

    fetchModel(url)
      .then(response => {
        this.setState({ photos: response.data, loading: false }); 
      })
      .catch(err => {
        this.setState({ error: err, loading: false }); 
      });
  }

  render() {
    const { photos, loading, error } = this.state; 
    const userId = this.props.match.params.userId; 

    if (loading) {
      return <Typography variant="body1">Loading photos...</Typography>; 
    }

    if (error) {
      return <Typography variant="body1">Error: {error.statusText}</Typography>; 
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
                    <Box key={comment._id} sx={{ marginBottom: 1 }}>
                      <Typography variant="caption">
                        <Link href={`http://localhost:3000/photo-share.html#/users/${comment.user._id}`} underline="hover">
                          {`${comment.user.first_name} ${comment.user.last_name}`} 
                        </Link>
                        : {comment.comment} (on {new Date(comment.date_time).toLocaleString()}) 
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="caption">No comments available.</Typography>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No photos available for this user.</Typography>
        )}
      </Box>
    );
  }
}

export default UserPhotos;
