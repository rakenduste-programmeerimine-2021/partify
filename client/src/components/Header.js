import React from 'react';
import {AppBar, Box, Toolbar, Typography, Button, Tab} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add'
import { Component } from 'react';
import Auth from '../services/Auth';
import Profile from './Profile';
import LogoutIcon from '@mui/icons-material/Logout';

const appStyle = {backgroundColor:'rgb(68 122 48)'}
const typoStyle = {cursor:'pointer'}

export default class Header extends Component {
    

    constructor(props) {
      super(props)
      this.logOut = this.logOut.bind(this)

      this.state = {
        currentUser: undefined,
        showProfile: false
      }
    }

    componentDidMount(){
      const user = Auth.getCurrentUser()

      if(user){
        this.setState({
          currentUser: user,
          showProfile: user
        })
      }
    }

    logOut() {
      Auth.logout()
    }

    render(){
      const { currentUser, showProfile } = this.state

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

              {currentUser ? (
                <div>
                  <Tab href='/profile' icon={<PersonIcon />} aria-label="person" />    
                  <Tab href='/settings' icon={<SettingsIcon />} aria-label="settings" />    
                  <Tab href='/addpost' icon={<AddIcon />} aria-label="add" />    
                  <Tab href='/viewpost' icon={<PersonPinIcon />} aria-label="person" />         
                  <Tab href='login' onClick={this.logOut} icon={<LogoutIcon/>}/>
                </div>
              ) : (
                <div>
                  <Tab href='/login' icon={<LoginIcon />} aria-label="login" />
                  <Tab href='/register' icon={<PersonPinIcon />} aria-label="register" />    
                </div>
              )}            
            
            </Toolbar>
          </AppBar>
        </Box>
      );
    }
  
}