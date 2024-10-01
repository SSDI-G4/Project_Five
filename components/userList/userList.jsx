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
          <ListItem key={user._id} button component={Link} to={/users/${user._id}}>
            <ListItemText primary={user.first_name + ' ' + user.last_name} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default UserList;
