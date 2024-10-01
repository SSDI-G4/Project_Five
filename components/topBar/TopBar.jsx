import React from 'react';
import {
  AppBar, Toolbar, Typography, Box
} from '@mui/material';
import { withRouter } from 'react-router-dom';
import './TopBar.css';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location !== prevProps.location) {
      let userId = null;
      if (location.pathname.startsWith('/users/')) {
        userId = location.pathname.split('/')[2];
      } else if (location.pathname.startsWith('/photos/')) {
        userId = location.pathname.split('/')[2];
      }

      if (userId) {
        const user = window.models.userModel(userId);
        if (user) {
          this.setState({ user });
        }
      }
    }
  }

  render() {
    const { location } = this.props;
    const { user } = this.state;
    let title = '';

    if (location) {
      if (location.pathname.startsWith('/photos/')) {
        if (user) {
          title = Photos of ${user.first_name} ${user.last_name};
        } else {
          title = 'Loading...';
        }
      } else if (location.pathname.startsWith('/users/')) {
        if (user) {
          title = ${user.first_name} ${user.last_name};
        } else {
          title = 'Loading...';
        }
      } else {
        title = 'PhotoShare App'; 
      }
    }

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Group 4 
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(TopBar);
