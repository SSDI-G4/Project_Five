import React from 'react';
import {
  AppBar, Toolbar, Typography, Box
} from '@mui/material';
import { withRouter } from 'react-router-dom';
import './TopBar.css';
import axios from 'axios';


class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      version: null
    };
  }

  componentDidMount() {
    axios.get('/test/info')
      .then((response) => {
        const version = response.data.version;  
        this.setState({ version });
      })
      .catch((error) => {
        console.error('Error fetching version:', error);
      });

    this.loadUserDetails();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location !== prevProps.location) {
      this.loadUserDetails();
    }
  }

  loadUserDetails = async () => {
    const { location } = this.props;
    const userId = location.pathname.split('/')[2];

    if (userId) {
        try {
            
            const response = await axios.get(`/user/${userId}`);
            const user = response.data; 
            this.setState({ user });
        } catch (error) {
            console.error('Error fetching user:', error); 
        }
    } else {
        this.setState({ user: null }); 
    }
};


  render() {
    const { location } = this.props;
    const { user, version } = this.state;
    let title = '';

    if (location) {
      if (location.pathname.startsWith('/photos/')) {
        title = user ? `Photos of ${user.first_name} ${user.last_name}` : 'Loading...';
      } else if (location.pathname.startsWith('/users/')) {
        title = user ? `Details of ${user.first_name} ${user.last_name}` : 'Loading...';
      } else {
        title = 'PhotoShare App'; 
      }
    }

    return (
      <AppBar className="topbar-appBar" position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Group 4
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', flexGrow: 1 }}>
          <Typography variant="h6" color="inherit" textAlign={'center'}>
            App Version:
          </Typography>
          <Box sx={{ width: '10px' }} />
          {version && (
            <Typography variant="body1" color="inherit">
              {version}
            </Typography>
          )}
          </Box>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(TopBar);
