import {
  Container,
  FormControl,
  Typography,
  Box, Stack,
  Grid,
  Button,
  TextField
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { async } from "@firebase/util";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(user);
        navigate("/login");
      })
      .catch((error) => {
        const { errorCode, errorMessage } = error;
        alert(errorCode, errorMessage);
      });
  };

  return (
    <Grid container spacing={2} alignItems="center"   textAlign='center' sx={{height:'100vh', backgroundColor: (theme) => theme.palette.background}}>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          Sign up
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="form" onSubmit={onSubmit} color="primary">
          <TextField
            sx={{mb:2}}
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
          <TextField
            sx={{mb:2}}
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <Box>
            <Button variant="contained" type="submit">
              Sign up
            </Button>
          </Box>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align="center">
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </Typography>
      </Grid>
  </Grid>
  );
};

export default Signup;
