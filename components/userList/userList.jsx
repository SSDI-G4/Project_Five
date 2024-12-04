<<<<<<< HEAD
// import React, { useEffect, useState } from "react";
// import { List, ListItem, ListItemText } from "@mui/material";
// import "./userList.css";
// import { useHistory, Link } from "react-router-dom";
// import axios from "axios";

// function UserList() {
//   const [userData, setUserData] = useState([]);
//   const history = useHistory();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/user/list/")
//       .then((res) => {
//         setUserData(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   return (
//     <div>
//       <List component="nav">
//         {userData.map((user, index) => (
//           <Link to={"/users/" + user._id} key={index} className={`main-user-list`}>
//             <ListItem onClick={() => history.push("/users/" + user._id)}>
//               <ListItemText primary={`${user.first_name} ${user.last_name}`} />
//             </ListItem>
//           </Link>
//         ))}
//       </List>
//     </div>
//   );
// }

// export default UserList;


=======
>>>>>>> f7771d4aa7fc7fccb65a53461bc89c08c4a7b745
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, CircularProgress, Box, Typography } from '@mui/material';
import './userList.css';
import axios from 'axios';


class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const url = '/user/list';
    axios.get(url)
      .then(response => {
        this.setState({ users: response.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  }

  render() {
    const { users, loading, error } = this.state;

    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h6" color="error">
            Error: {error.statusText}
          </Typography>
        </Box>
      );
    }

    return (
<<<<<<< HEAD
      <Box sx={{ width: '250px', margin: 'auto', padding: '20px', position: 'fixed', backgroundColor: '#ffffff'}}>
=======
      <Box sx={{ width: '300px', margin: 'auto', padding: '20px', position: 'fixed', backgroundColor: '#ffffff'}}>
>>>>>>> f7771d4aa7fc7fccb65a53461bc89c08c4a7b745
        <Typography variant="h5" align="center" sx={{ marginBottom: '16px', color: '#3f51b5' }}>
          User List
        </Typography>
        <List sx={{ padding: 0 }}>
          {users.map(user => (
            <ListItem
              key={user._id}
              component={Link}
              to={`/users/${user._id}`}
              sx={{
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s',
                },
                marginBottom: '8px',
                borderRadius: '4px',
                padding: '10px',
                cursor: 'pointer',
                boxShadow: 1,
              }}
            >
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                sx={{ color: '#333', fontWeight: '500' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
}

<<<<<<< HEAD
export default UserList;
=======
export default UserList;
>>>>>>> f7771d4aa7fc7fccb65a53461bc89c08c4a7b745
