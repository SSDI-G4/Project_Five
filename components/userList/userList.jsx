// import React from 'react';
// import {
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// }
// from '@mui/material';
// import './userList.css';

// /**
//  * Define UserList, a React component of project #5
//  */
// class UserList extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <Typography variant="body1">
//           This is the user list, which takes up 3/12 of the window.
//           You might choose to use <a href="https://mui.com/components/lists/">Lists</a> and <a href="https://mui.com/components/dividers/">Dividers</a> to
//           display your users like so:
//         </Typography>
//         <List component="nav">
//           <ListItem>
//             <ListItemText primary="Item #1" />
//           </ListItem>
//           <Divider />
//           <ListItem>
//             <ListItemText primary="Item #2" />
//           </ListItem>
//           <Divider />
//           <ListItem>
//             <ListItemText primary="Item #3" />
//           </ListItem>
//           <Divider />
//         </List>
//         <Typography variant="body1">
//           The model comes in from window.models.userListModel()
//         </Typography>
//       </div>
//     );
//   }
// }

// export default UserList;
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import './userList.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: window.models.userListModel() 
    };
  }

  render() {
    return (
      <List>
        {this.state.users.map(user => (
          <ListItem key={user._id} button component={Link} to={`/users/${user._id}`}>
            <ListItemText primary={user.first_name + ' ' + user.last_name} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default UserList;
