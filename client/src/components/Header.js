import React from 'react';
import {AppBar, Box, Toolbar, Typography, Button, Tab} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import PersonPinIcon from '@mui/icons-material/PersonPin';



export default function Header() {
    const appStyle = {backgroundColor:'rgb(68 122 48)'}
    const typoStyle = {cursor:'pointer'}
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={appStyle}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography style={typoStyle} variant="h6" component="div" sx={{ flexGrow: 1 }}
          onClick={(e) => {
              e.preventDefault()
              window.location.href='/'
          }}>
            PARTIFY
          </Typography>
          <Tab href='/login' icon={<LoginIcon />} aria-label="favorite" />
          <Tab href='/register' icon={<PersonPinIcon />} aria-label="person" />    
        </Toolbar>
      </AppBar>
    </Box>
  );
}