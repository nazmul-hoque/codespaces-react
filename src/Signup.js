import {
  Container,
  Typography,
  Box,
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
    <Grid textAlign="center">
      <h1>Todo</h1>
      <h1>Signup</h1>
      <form>
        <TextField
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
        />
        <TextField
          type="password"
          label="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Email address"
        />
        <Box>
          <Button variant="contained" type="submit" onClick={onSubmit}>
            Sign up
          </Button>
        </Box>
      </form>

      <p>
        Already have an account? <NavLink to="/login">Sign in</NavLink>
      </p>
    </Grid>
  );
};

export default Signup;
