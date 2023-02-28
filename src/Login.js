import { Grid, Typography, TextField, Box, Button, FormControl } from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Grid container spacing={2} alignItems="center"   textAlign='center' sx={{height:'100vh'}}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="error">
          Login
        </Typography>
        </Grid>
        <Grid item xs={12}>
        <FormControl component="form" onSubmit={onLogin}>
          <TextField
            label="email"
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            No account yet? <NavLink to="/signup">Sign up</NavLink>
          </Typography>
          <Typography variant="body1" align="center">
            Goto <NavLink to="/todos">Todos</NavLink>
          </Typography>  
        </Grid>
  </Grid>
);
  };
export default Login
