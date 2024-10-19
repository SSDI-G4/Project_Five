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