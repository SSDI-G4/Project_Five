// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useHistory } from "react-router-dom";

// import "./loginRegister.css";
// import axios from "axios";
// import { Snackbar } from "@mui/material";

// // TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

// export default function LoginRegister({ setUser, setUserId }) {
//     const history = useHistory();
//     const [errorToastOpen, setErrorToastOpen] = React.useState(false);
//     const [successRegistration, setSuccessRegistration] = React.useState(false);
//     const [tab, setTab] = React.useState("signIn");
//     // const handleSignUp = (event) => {
//     //     event.preventDefault();
//     //     const data = new FormData(event.currentTarget);
//     //     if (data.get("password") !== data.get("confirm_password")) {
//     //     console.log("Passwords do not match");
//     //     } else {
//     //     axios
//     //         .post("http://localhost:3000/user", {
//     //         first_name: data.get("first_name"),
//     //         last_name: data.get("last_name"),
//     //         location: data.get("location"),
//     //         occupation: data.get("occupation"),
//     //         description: data.get("description"),
//     //         login_name: data.get("username"),
//     //         password: data.get("password"),
//     //         })
//     //         .then(() => {
//     //         setTab("signIn");
//     //         setSuccessRegistration(true);
//     //         })
//     //         .catch(() => setErrorToastOpen(true));
//     //     }
//     // };
//     const handleLogin = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         axios
//         .post("http://localhost:3000/admin/login", {
//             login_name: data.get("username"),
//             password: data.get("password"),
//         })
//         .then((res) => {
//             setUser(res.data.first_name);
//             setUserId(res.data._id);
//             history.push("/users");
//         })
//         .catch(() => setErrorToastOpen(true));
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//         <Snackbar open={errorToastOpen} autoHideDuration={6000} onClose={() => setErrorToastOpen(false)} message="Error: Please fill out all fields properly." />
//         <Snackbar open={successRegistration} autoHideDuration={6000} onClose={() => setSuccessRegistration(false)} message="Successfully registered. Please login" />
//         <Grid container component="main" sx={{ height: "100vh" }}>
//             <CssBaseline />
//             <Grid
//             item
//             xs={false}
//             sm={4}
//             md={7}
//             sx={{
//                 backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
//                 backgroundRepeat: "no-repeat",
//                 backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//             }}
//             />
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//             {tab === "signIn" && (
//                 <Box
//                 sx={{
//                     my: 8,
//                     mx: 4,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                 }}
//                 >
//                 <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>@</Avatar>
//                 <Typography component="h1" variant="h5">
//                     Sign in
//                 </Typography>
//                 <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
//                     <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
//                     <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
//                     {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
//                     <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                     Sign In
//                     </Button>
//                     <Grid container>
//                     <Grid item>
//                         <Typography>
//                         Don&apos;t have an account?
//                         <button className="link" onClick={() => setTab("signUp")} role="link" tabIndex={0}>
//                             Sign Up
//                         </button>
//                         </Typography>
//                     </Grid>
//                     </Grid>
//                 </Box>
//                 </Box>
//             )}
//             {tab === "signUp" && (
//                 <Box
//                 sx={{
//                     my: 8,
//                     mx: 4,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                 }}
//                 >
//                 <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>@</Avatar>
//                 <Typography component="h1" variant="h5">
//                     Sign Up
//                 </Typography>
//                 <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1 }}>
//                     <TextField margin="normal" required fullWidth id="first_name" label="First Name" name="first_name" autoComplete="first_name" autoFocus />
//                     <TextField margin="normal" required fullWidth id="last_name" label="Last Name" name="last_name" autoComplete="last_name" />
//                     <TextField margin="normal" required fullWidth id="location" label="Location" name="location" autoComplete="location" />
//                     <TextField margin="normal" required fullWidth id="occupation" label="Occupation" name="occupation" autoComplete="occupation" />
//                     <TextField margin="normal" required fullWidth id="description" label="Description" name="description" autoComplete="description" />
//                     <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
//                     <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
//                     <TextField margin="normal" required fullWidth name="confirm_password" label="Confirm Password" type="password" id="confirm_password" autoComplete="current-password" />
//                     <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                     Sign Up
//                     </Button>
//                     <Grid container>
//                     <Grid item>
//                         <Typography>
//                         Already have an account?
//                         <button className="link" onClick={() => setTab("signIn")} role="link" tabIndex={0}>
//                             Sign In
//                         </button>
//                         </Typography>
//                     </Grid>
//                     </Grid>
//                 </Box>
//                 </Box>
//             )}
//             </Grid>
//         </Grid>
//         </ThemeProvider>
//     );
//     }


// import React, { useState } from 'react';
// import { Button, TextField, Typography, Box } from '@mui/material';
// import axios from 'axios';
// import './LoginRegister.css';

// const LoginRegister = ({ onLogin }) => {
//     const [loginName, setLoginName] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//         const response = await axios.post('/admin/login', { login_name: loginName, password });
//         onLogin(response.data); // Notify parent component of successful login
//         } catch (error) {
//         setErrorMessage('Login failed. Please check your login name.');
//         }
//     };

//     return (
//         <Box className="login-register-container">
//         <Typography variant="h4">Login</Typography>
//         <form onSubmit={handleLogin}>
//             <TextField
//                 label="Login Name"
//                 variant="outlined"
//                 value={loginName}
//                 onChange={(e) => setLoginName(e.target.value)}
//                 required
//             />
//             <Button type="submit" variant="contained" color="primary">Login</Button>
//         </form>
//         {errorMessage && <Typography color="error">{errorMessage}</Typography>}
//         </Box>
//     );
// };

// export default LoginRegister;







// import React, { useState } from 'react';
// import { Button, TextField, Typography, Box } from '@mui/material';
// import axios from 'axios';
// import './LoginRegister.css';

// const LoginRegister = ({ onLogin }) => {
//     const [loginName, setLoginName] = useState('');
//     const [password, setPassword] = useState('weak'); // Default to "weak" for already registered users
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             // Use "weak" password for already registered users
//             const response = await axios.post('/admin/login', { login_name: loginName, password });
//             onLogin(response.data); // Notify parent component of successful login
//         } catch (error) {
//             setErrorMessage('Login failed. Please check your login name and password.');
//         }
//     };

//     return (
//         <Box className="login-register-container">
//             <Typography variant="h4">Login</Typography>
//             <form onSubmit={handleLogin}>
//                 <TextField
//                     label="Login Name"
//                     variant="outlined"
//                     value={loginName}
//                     onChange={(e) => setLoginName(e.target.value)}
//                     required
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <Button type="submit" variant="contained" color="primary">Login</Button>
//             </form>
//             {errorMessage && <Typography color="error">{errorMessage}</Typography>}
//         </Box>
//     );
// };

// export default LoginRegister;





import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Snackbar } from '@mui/material';
import axios from 'axios';
import './LoginRegister.css';

function LoginRegister({ onLogin }) {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [description, setDescription] = useState('');
    const [tab, setTab] = useState('signIn');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const clearFormFields = () => {
        setFirstName('');
        setLastName('');
        setLocation('');
        setOccupation('');
        setDescription('');
        setLoginName('');
        setPassword('');
        setConfirmPassword('');
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/admin/login', { login_name: loginName, password });
            onLogin(response.data);
        } catch (error) {
            setErrorMessage('Login failed. Please check your login name and password.');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        
        try {
            await axios.post('/user', {
                first_name: firstName,
                last_name: lastName,
                location,
                occupation,
                description,
                login_name: loginName,
                password,
            });
            setSuccessMessage("Successfully registered. Please login.");
            setTab("signIn");
            clearFormFields();
        } catch (error) {
            setErrorMessage("Registration failed. Please check your input.");
        }
    };

    

    return (
        <Box className="login-register-container">
            <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')} message={errorMessage} />
            <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')} message={successMessage} />

            {tab === "signIn" ? (
                <>
                    <Typography variant="h4">Login</Typography>
                    <form onSubmit={handleLogin}>
                        <TextField label="Login Name" variant="outlined" value={loginName} onChange={(e) => setLoginName(e.target.value)} required />
                        <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Button type="submit" variant="contained" color="primary">Login</Button>
                    </form>
                    <Typography>
                    Don&apos;t have an account? <button onClick={() => setTab("signUp")}>Sign Up</button>
                    </Typography>
                </>
            ) : (
                <>
                    <Typography variant="h4">Register</Typography>
                    <form onSubmit={handleSignUp}>
                        <TextField label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <TextField label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        <TextField label="Location" variant="outlined" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <TextField label="Occupation" variant="outlined" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                        <TextField label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} />
                        <TextField label="Login Name" variant="outlined" value={loginName} onChange={(e) => setLoginName(e.target.value)} required />
                        <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <TextField label="Confirm Password" type="password" variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <Button type="submit" variant="contained" color="primary">Register Me</Button>
                    </form>
                    <Typography>
                        Already have an account? <button onClick={() => setTab("signIn")}>Sign In</button>
                    </Typography>
                </>
            )}
        </Box>
    );
}

export default LoginRegister;
