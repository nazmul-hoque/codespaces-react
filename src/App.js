import { Container, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Todos from "./Todos";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<Todos />} />
      <Route
        path="/*"
        element={
          <Grid Container textAlign="center" sx={{ height: "100vh" }}>
            <Typography variant="h3">404</Typography>
            <Typography variant="h2">Page Not Found</Typography>
            <NavLink sx={{ m: 5 }} to="/">
              Home
            </NavLink>
            <span>|</span>
            <NavLink sx={{ m: 5 }} to="/login">
              Login
            </NavLink>
          </Grid>
        }
      />
    </Routes>
  );
}
