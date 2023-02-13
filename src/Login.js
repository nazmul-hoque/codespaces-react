import { Grid, Typography, TextField, Box, Button } from "@mui/material";
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
    <Grid textAlign="center">
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        <Box>
          <Typography variant="h3"> Todo </Typography>
        </Box>

        <Typography variant="subtitle1" color="error">
          Login
        </Typography>
        <form>
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
          <Box sx={{ m: 5 }}>
            <Button variant="contained" onClick={onLogin}>
              Login
            </Button>
          </Box>
        </form>

        <p className="text-sm text-white text-center">
          No account yet? <NavLink to="/signup">Sign up</NavLink>
        </p>
        <p>
          Goto <NavLink to="/todos">Todos</NavLink>
        </p>
      </Box>
    </Grid>
  );
};

export default Login;
