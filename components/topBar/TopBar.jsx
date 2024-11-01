import React, { useEffect, useState, useRef } from 'react';
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';

function TopBar({ user, onLogout }) {
  const [version, setVersion] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false); // State for dialog visibility
  const uploadInputRef = useRef(null);

  // Fetch the app version when the component mounts
  useEffect(() => {
    axios.get('/test/info')
      .then((response) => {
        const appVersion = response.data.version;
        setVersion(appVersion);
      })
      .catch((error) => {
        console.error('Error fetching version:', error);
      });
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  const handleUploadButtonClick = () => {
    setUploadDialogOpen(true); // Open the upload dialog
  };

  const handleNewPhoto = (e) => {
    e.preventDefault();
    const uploadInput = uploadInputRef.current;
    if (uploadInput && uploadInput.files.length > 0) {
      const domForm = new FormData();
      domForm.append('uploadedphoto', uploadInput.files[0]);
      axios.post("/photos/new", domForm)
        .then(() => {
          console.log("Photo uploaded successfully");
          setUploadDialogOpen(false); // Close dialog after successful upload
        })
        .catch(error => {
          console.error('Error uploading photo:', error);
        });
    }
  };

  const handleCloseDialog = () => {
    setUploadDialogOpen(false); // Close dialog without uploading
  };

  return (
    <AppBar position="fixed">
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
          {version ? (
            <Typography variant="body1" color="inherit">
              {version}
            </Typography>
          ) : (
            <Typography variant="body1" color="inherit">
              Loading...
            </Typography>
          )}
        </Box>
        {user ? (
          <>
            <Button style={{ marginRight: '20px' }} color="inherit" onClick={handleUploadButtonClick}>Upload Photo</Button>
            <Dialog open={uploadDialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Upload New Photo</DialogTitle>
              <DialogContent>
                <input type="file" accept="image/*" ref={uploadInputRef} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                <Button onClick={handleNewPhoto} color="primary">Submit Photo</Button>
              </DialogActions>
            </Dialog>
            <Typography variant="h6" style={{ marginRight: '20px' }}>
              Hi, {user.first_name}!
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Typography variant="h6">
            Please login
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
