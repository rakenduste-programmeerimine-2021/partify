import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



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
          <Button color="inherit" onClick={(e) => {
            e.preventDefault()
            window.location.href='/login'
            }}>
                LOGIN
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}