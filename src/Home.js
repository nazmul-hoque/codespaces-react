import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { Container, Typography, TextField, Box, Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        alert("uid", uid);
      } else {
        navigate("/login");
        alert("user is logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  return (
    <>
      <nav>
        <Typography variant="h5" component="h1">
          Welcome Home
        </Typography>
        <div>
          <Button color="error" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Home;
