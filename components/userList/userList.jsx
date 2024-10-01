import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import './userList.css';
import fetchModel from '../../lib/fetchModelData'; 

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], 
      loading: true, 
      error: null 
    };
  }

  componentDidMount() {
    const url = '/user/list'; 
    fetchModel(url)
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
      return <div>Loading...</div>; 
    }

    if (error) {
      return <div>Error: {error.statusText}</div>; 
    }

    return (
      <List>
        {users.map(user => (
          <ListItem key={user._id} button component={Link} to={`/users/${user._id}`}>
            <ListItemText primary={`${user.first_name} ${user.last_name}`} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default UserList;
