// import React from 'react';
// import {
//   Typography
// } from '@mui/material';
// import './userDetail.css';


// /**
//  * Define UserDetail, a React component of project #5
//  */
// class UserDetail extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Typography variant="body1">
//         This should be the UserDetail view of the PhotoShare app. Since
//         it is invoked from React Router the params from the route will be
//         in property match. So this should show details of user:
//         {this.props.match.params.userId}. You can fetch the model for the
//         user from window.models.userModel(userId).
//       </Typography>
//     );
//   }
// }

// export default UserDetail;
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import './userDetail.css';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null 
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
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <Typography>Loading...</Typography>; 
    }

    return (
      <div className="user-detail">
        <Typography variant="h5">{user.first_name} {user.last_name}</Typography>
        <Typography variant="body1">Location: {user.location}</Typography>
        <Typography variant="body1">Occupation: {user.occupation}</Typography>
        <Typography variant="body1">Description: {user.description}</Typography>
        <Button variant="contained" component={Link} to={`/photos/${user._id}`}>
          View Photos
        </Button>
      </div>
    );
  }
}

export default UserDetail;

