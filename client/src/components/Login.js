import React from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import CelebrationIcon from '@mui/icons-material/Celebration';

export default function Login () {
    const paperStyle={padding: 20, height: '70vh', width:360, margin:'20px auto'}
    const avatarStyle={color:'#b3ff00', backgroundColor:'white'}
    return(
        <div>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align={'center'}>
                        <Avatar style={avatarStyle}><CelebrationIcon/></Avatar>
                        <h2>Welcome to the party!</h2>
                    </Grid>
                    <TextField 
                        margin='normal' 
                        label='Username' 
                        fullWidth 
                        required 
                        id="filled-basic" 
                        variant="filled" 
                    />                    
                    <TextField 
                        margin='normal' 
                        label='Password' 
                        type='password' 
                        fullWidth 
                        required 
                        id="filled-basic" 
                        variant="filled" 
                    />
                    <h2/>
                    <Grid>
                        <Button type='submit' color='primary'  fullWidth>LOG IN</Button>
                        <h2/>
                        <Typography sx={{ flexGrow: 1 }}>
                            Don't have an account?  
                            <Link href='/register' underline="hover">Register</Link>
                        </Typography>
                    </Grid>
                    
                </Paper>
            </Grid>
        </div>
    )
    
}