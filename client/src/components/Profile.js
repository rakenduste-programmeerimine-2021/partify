import React, { Component } from "react";
import Auth from "../services/Auth";
import { Typography, Grid, Paper, Avatar, Stack, Button } from '@mui/material';

const paperStyle = {padding: 20, height:'100%', width:760, margin:'20px auto'}


export default class Profile extends Component {
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)

        this.state = {
            currentUser: Auth.getCurrentUser()
        }
    }

    logout(){
        Auth.logout()
    }


    render(){
        const { currentUser } = this.state

        return(
            <div>
                <Grid>
                    <Paper style={paperStyle}>
                        <Grid align={'center'} >
                            <Stack spacing={2}>
                                <Avatar sx={{ width:96, height:96, margin:'auto'}}>{currentUser.avatar}</Avatar>
                                <Typography variant='h4'>{currentUser.userName}</Typography>
                                <Typography variant='h6'>{currentUser.gender}</Typography>
                                <Typography>{currentUser.dateOfBirth}</Typography>
                                <Button onClick={this.logout}>Logout</Button>
                            </Stack>
                        </Grid>
                    </Paper>
                    <Paper style={paperStyle}>
                        
                    </Paper>
                </Grid>
            </div>
        )
    }
}