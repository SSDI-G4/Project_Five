import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import './userDetail.css';
import fetchModel from '../../lib/fetchModelData'; 

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

    fetchModel(url)
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
      return <Typography>Loading...</Typography>; 
    }

    if (error) {
      return <Typography>Error: {error.statusText}</Typography>; 
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
