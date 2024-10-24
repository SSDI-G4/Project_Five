// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import {
// //   HashRouter, Route, Switch
// // } from 'react-router-dom';
// // import {
// //   Grid,  Paper
// // } from '@mui/material';
// // import './styles/main.css';
// // import TopBar from './components/topBar/TopBar';
// // import UserDetail from './components/userDetail/userDetail';
// // import UserList from './components/userList/userList';
// // import UserPhotos from './components/userPhotos/userPhotos';

// // class PhotoShare extends React.Component {
// //   constructor(props) {
// //     super(props);
// //   }

// //   render() {
// //     return (
// //       <HashRouter>
// //       <div>
// //       <Grid container spacing={8}>
// //         <Grid item xs={12}>
// //           <TopBar/>
// //         </Grid>
// //         <div className="main-topbar-buffer"/>
// //         <Grid item sm={3}>
// //           <Paper className="main-grid-item">
// //             <UserList />
// //           </Paper>
// //         </Grid>
// //         <Grid item sm={9}>
// //           <Paper className="main-grid-item">
// //             <Switch>
// //               <Route path="/users/:userId"
// //                 render={ props => <UserDetail {...props} /> }
// //               />
// //               <Route path="/photos/:userId"
// //                 render ={ props => <UserPhotos {...props} /> }
// //               />
// //               <Route path="/users" component={UserList}  />
// //             </Switch>
// //           </Paper>
// //         </Grid>
// //       </Grid>
// //       </div>
// //       </HashRouter>
// //     );
// //   }
// // }


// // ReactDOM.render(
// //   <PhotoShare />,
// //   document.getElementById('photoshareapp'),
// // );




// import React from 'react';
// import ReactDOM from 'react-dom';
// import {
//   HashRouter, Route, Switch, Redirect
// } from 'react-router-dom';
// import {
//   Grid, Paper
// } from '@mui/material';
// import './styles/main.css';
// import TopBar from './components/topBar/TopBar';
// import UserDetail from './components/userDetail/userDetail';
// import UserList from './components/userList/userList';
// import UserPhotos from './components/userPhotos/userPhotos';
// import LoginRegister from './components/loginRegister/loginRegister'; // Import the new component

// class PhotoShare extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null, // Store the logged-in user
//     };
//   }

//   handleLogin = (user) => {
//     this.setState({ user }); // Set user state upon successful login
//   };

//   render() {
//     const { user } = this.state; // Destructure user from state

//     return (
//       <HashRouter>
//         <div>
//           <Grid container spacing={8}>
//             <Grid item xs={12}>
//               <TopBar user={user} />
//             </Grid>
//             <div className="main-topbar-buffer" />
//             <Grid item sm={3}>
//               <Paper className="main-grid-item">
//                 {user ? <UserList /> : null} {/* Render UserList only if user is logged in */}
//               </Paper>
//             </Grid>
//             <Grid item sm={9}>
//               <Paper className="main-grid-item">
//                 <Switch>
//                   <Route path="/login-register">
//                     <LoginRegister onLogin={this.handleLogin} />
//                   </Route>
//                   <Route path="/users/:userId" render={props => (
//                     user ? <UserDetail {...props} /> : <Redirect to="/login-register" />
//                   )} />
//                   <Route path="/photos/:userId" render={props => (
//                     user ? <UserPhotos {...props} /> : <Redirect to="/login-register" />
//                   )} />
//                   <Route path="/users" render={() => (
//                     user ? <UserList /> : <Redirect to="/login-register" />
//                   )} />
//                   <Redirect from="/" to={user ? "/users" : "/login-register"} />
//                 </Switch>
//               </Paper>
//             </Grid>
//           </Grid>
//         </div>
//       </HashRouter>
//     );
//   }
// }

// ReactDOM.render(
//   <PhotoShare />,
//   document.getElementById('photoshareapp'),
// );




// import React from 'react';
// import ReactDOM from 'react-dom';
// import {
//   HashRouter, Route, Switch, Redirect
// } from 'react-router-dom';
// import {
//   Grid, Paper
// } from '@mui/material';
// import './styles/main.css';
// import TopBar from './components/topBar/TopBar';
// import UserDetail from './components/userDetail/userDetail';
// import UserList from './components/userList/userList';
// import UserPhotos from './components/userPhotos/userPhotos';
// import LoginRegister from './components/loginRegister/loginRegister';
// import axios from 'axios';

// class PhotoShare extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null, // Store the logged-in user
//     };
//   }

//   handleLogin = (user) => {
//     this.setState({ user }); // Set user state upon successful login
//   };

//   handleLogout = async () => {
//     try {
//       await axios.post('/admin/logout'); // Send logout request to the server
//       this.setState({ user: null }); // Clear user state after logout
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   render() {
//     const { user } = this.state; // Destructure user from state

//     return (
//       <HashRouter>
//         <div>
//           <Grid container spacing={8}>
//             <Grid item xs={12}>
//               <TopBar user={user} onLogout={this.handleLogout} /> {/* Pass user and logout handler */}
//             </Grid>
//             <div className="main-topbar-buffer" />
//             <Grid item sm={3}>
//               <Paper className="main-grid-item">
//                 {user ? <UserList /> : null} {/* Render UserList only if user is logged in */}
//               </Paper>
//             </Grid>
//             <Grid item sm={9}>
//               <Paper className="main-grid-item">
//                 <Switch>
//                   <Route path="/login-register">
//                     <LoginRegister onLogin={this.handleLogin} />
//                   </Route>
//                   <Route path="/users/:userId" render={props => (
//                     user ? <UserDetail {...props} /> : <Redirect to="/login-register" />
//                   )} />
//                   <Route path="/photos/:userId" render={props => (
//                     user ? <UserPhotos {...props} /> : <Redirect to="/login-register" />
//                   )} />
//                   <Route path="/users" render={() => (
//                     user ? <UserList /> : <Redirect to="/login-register" />
//                   )} />
//                   <Redirect from="/" to={user ? "/users" : "/login-register"} />
//                 </Switch>
//               </Paper>
//             </Grid>
//           </Grid>
//         </div>
//       </HashRouter>
//     );
//   }
// }

// ReactDOM.render(
//   <PhotoShare />,
//   document.getElementById('photoshareapp'),
// );







import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import {
  Grid, Paper
} from '@mui/material';
import './styles/main.css';
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import LoginRegister from './components/loginRegister/loginRegister';
import axios from 'axios';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, // Store the logged-in user
    };
  }

  handleLogin = (user) => {
    this.setState({ user }); // Set user state upon successful login
  };

  handleLogout = async () => {
    try {
      await axios.post('/admin/logout'); // Send logout request to the server
      this.setState({ user: null }); // Clear user state after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  render() {
    const { user } = this.state; // Destructure user from state

    return (
      <HashRouter>
        <div>
          <Grid container spacing={0} style={{ margin: 0, padding: 0 }}>
            <Grid item xs={12}>
              <TopBar user={user} onLogout={this.handleLogout} /> {/* Pass user and logout handler */}
            </Grid> 
            <div className="main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="main-grid-item">
                {user ? <UserList /> : null} {/* Render UserList only if user is logged in */}
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Switch>
                  {/* Show login/register only if no user is logged in */}
                  <Route path="/login-register" render={() => (
                    user ? <Redirect to={`/users/${user._id}`} /> : <LoginRegister onLogin={this.handleLogin} />
                  )} />
                  {/* Redirect to user's details after login */}
                  <Route path="/users/:userId" render={props => (
                    user ? <UserDetail {...props} /> : <Redirect to="/login-register" />
                  )} />
                  <Route path="/photos/:userId" render={props => (
                    user ? <UserPhotos {...props} /> : <Redirect to="/login-register" />
                  )} />
                  <Route path="/users" render={() => (
                    user ? <UserList /> : <Redirect to="/login-register" />
                  )} />
                  {/* Default route redirects to either users list or login */}
                  <Redirect from="/" to={user ? `/users/${user._id}` : "/login-register"} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
