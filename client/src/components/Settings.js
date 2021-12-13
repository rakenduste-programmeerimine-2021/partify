import React, {Component} from "react";
import { Grid, Paper, Avatar, Chip, TextField, Box, Stack, Button } from '@mui/material'
import Auth from "../services/Auth";

const paperStyle = {padding: 20, height:'100%', width:760, margin:'20px auto'}

export default class Settings extends Component {
    constructor(props){
        super(props)
        this.handleAvatar = this.handleAvatar.bind(this)

        this.state = {
            currentUser: Auth.getCurrentUser()
        }
    }

    handleAvatar(e){
        var image = document.getElementById("output")
        image.src = URL.createObjectURL(e.target.files[0])
    }


    render(){
        const { currentUser } = this.state

        return(
            <div>
                <Grid align={'center'} spacing={2}>
                    <Paper style={paperStyle} >
                        <Box >
                            
                            <Avatar sx = {{ height: 56, width: 56}} margin="auto">{currentUser.avatar}</Avatar>
                            <h2/>
                            <Chip label="Change Avatar" onClick={this.handleAvatar} />
                            <h2/>
                            <Stack spacing={2}>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="First Name"
                                    fullWidth
                                    defaultValue={currentUser.firstName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Last Name"
                                    fullWidth
                                    defaultValue={currentUser.lastName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Username"
                                    fullWidth
                                    defaultValue={currentUser.userName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Email"
                                    fullWidth
                                    defaultValue={currentUser.email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Phone"
                                    fullWidth
                                    defaultValue={currentUser.phone}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Gender"
                                    fullWidth
                                    defaultValue={currentUser.gender}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Date of Birth"
                                    fullWidth
                                    defaultValue={currentUser.dateOfBirth}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <Button 
                                    type='submit' 
                                    color='primary'  
                                    fullWidth
                                    >
                                        SAVE
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
            </div>
        )
    }
}