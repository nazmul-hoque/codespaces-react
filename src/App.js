import {Grid, Box, AppBar, Toolbar, Button, IconButton, Switch, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, createTheme, ThemeProvider, GlobalStyles } from '@mui/material';
import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Todos from "./Todos";
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { blue, yellow } from '@mui/material/colors';
import { useColorMode, ColorModeContextProvider } from './ColorModeContextProvider';

// const colorTheme = {
//   primary: {
//     main: '#2196f3',
//     light: '#64b5f6',
//     dark: '#1976d2',
//     contrastText: '#fff',
//   },
//   secondary: {
//     main: '#f50057',
//     light: '#ff4081',
//     dark: '#c51162',
//     contrastText: '#fff',
//   },
//   text: {
//     primary: '#212121',
//     secondary: '#757575',
//     disabled: '#bdbdbd',
//     hint: '#9e9e9e',
//   },
//   background: {
//     paper: '#fff',
//     default: '#f5f5f5',
//   },
// };

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#2196f3',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//     background: {
//       default: "#e4f0e2"
//     }
//   },
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#90caf9',
//     },
//     secondary: {
//       main: '#f48fb1',
//     },
//     background: {
//       default: "#CCC",
//     },
//     text: {
//       primary: "#ffffff"
//     }
//   },
// });



const drawerWidth = 240;

const Main = styled('main')({
  flexGrow: 1,
  padding: (theme) => theme.spacing(3),
});

const DrawerContainer = styled('div')({
  overflow: 'auto',
});

const DrawerPaper = styled('div')(({ theme }) => ({
  width: drawerWidth,
  backgroundColor: theme.palette.background.default,
}));



export default function App() {
  const [open, setOpen] = useState(false);
  //const [theme, setTheme] = useState(lightTheme);

  const{colorMode} =useColorMode();

  // const toggleTheme = () => {
  //   setTheme(theme === lightTheme ? darkTheme : lightTheme);
  // };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
  // <ThemeProvider theme={theme}>
  //   <GlobalStyles
  //         styles={{
  //           body: { backgroundColor: "#CCC" },
  //         }}
  //       />

  <ColorModeContextProvider>   
  <Box sx={{ display: 'flex'}}>
    <AppBar position="fixed" >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Todo App
        </Typography>
        <Typography sx={{flexGrow:1}}><Switch checked={colorMode?.mode === 'dark'} onChange={(e)=>colorMode.toggleColorMode()} /></Typography>      
    </Toolbar>
    </AppBar>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
      classes={{ paper: DrawerPaper }}
    >
      <DrawerContainer>
        <List>
          <ListItem  onClick={handleDrawerClose}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Close Drawer" />
          </ListItem>
          <ListItem  onClick={handleDrawerClose}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Close Drawer" />
          </ListItem>
          <ListItem  onClick={(e)=>colorMode.toggleColorMode()}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="ChangeTheme" />
          </ListItem>
          {/* Add more menu items here */}
        </List>
      </DrawerContainer>
    </Drawer>
    <Main>
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
        <Route
          path="/*"
          element={
            <Grid container justifyContent="center" alignItems="center" height="80vh">
              <Grid item xs={12} sm={6}>
                <Typography variant="h3" align="center" color="primary" gutterBottom>
                  404
                </Typography>
                <Typography variant="h2" align="center" gutterBottom>
                  Page Not Found
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                  We're sorry, but the page you requested could not be found. Please check the URL and try again.
                </Typography>
                <Grid container justifyContent="center" alignItems="center">
                  <Button component={NavLink} to="/" variant="contained" color="primary" sx={{ m: 2 }}>
                    Home
                  </Button>
                  <Button component={NavLink} to="/login" variant="contained" color="secondary" sx={{ m: 2 }}>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          }
        />
      </Routes>
    </Main>
  </Box>
{/* </ThemeProvider> */}
</ColorModeContextProvider>
  );
}
