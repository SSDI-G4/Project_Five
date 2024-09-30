// import React from 'react';
// import {
//   Typography
// } from '@mui/material';
// import './userPhotos.css';


// /**
//  * Define UserPhotos, a React componment of project #5
//  */
// class UserPhotos extends React.Component {
//   constructor(props) {
//     super(props);

//   }

//   render() {
//     return (
//       <Typography variant="body1">
//       This should be the UserPhotos view of the PhotoShare app. Since
//       it is invoked from React Router the params from the route will be
//       in property match. So this should show details of user:
//       {this.props.match.params.userId}. You can fetch the model for the user from
//       window.models.photoOfUserModel(userId):
//         <Typography variant="caption">
//           {JSON.stringify(window.models.photoOfUserModel(this.props.match.params.userId))}
//         </Typography>
//       </Typography>

//     );
//   }
// }

// export default UserPhotos;
import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import './userPhotos.css';

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, 
      photoUrls: [], 
      maxPhotoCount: 10 
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
    const user = window.models.userModel(userId);
    this.setState({ user }, this.loadUserPhotos);
  }

  loadUserPhotos() {
    const { user, maxPhotoCount } = this.state;

    if (!user) return;

    const photoUrls = [];
    for (let i = 1; i <= maxPhotoCount; i++) {
      const url = `/images/${user.last_name.toLowerCase()}${i}.jpg`; 

      
      const img = new Image();
      img.src = url;
      img.onload = () => {
        photoUrls.push(url);
        this.setState({ photoUrls: [...photoUrls] });
      };
      img.onerror = () => {
        
        
      };
    }
  }

  render() {
    const { user, photoUrls } = this.state;

    if (!user) {
      return <Typography>Loading...</Typography>;
    }

    if (photoUrls.length === 0) {
      return <Typography>No photos available for this user.</Typography>;
    }

    return (
      <div className="user-photos">
        {photoUrls.map((url, index) => (
          <Card key={index} className="photo-card">
            <CardMedia
              component="img"
              height="200"
              image={url}
              alt={`User photo ${index + 1}`}
            />
            <CardContent>
              <Typography variant="body2">
                Photo {index + 1} for {user.first_name} {user.last_name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default UserPhotos;


