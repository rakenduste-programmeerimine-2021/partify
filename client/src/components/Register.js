import React from "react";
import { TextField, Grid, Paper, Avatar, Button, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';


export default function Register () {
    const paperStyle = {padding: 20, height:'80vh', width:560, margin:'20px auto'}
    const avatarStyle={color:'#b3ff00', backgroundColor:'white'}
    const regStyle={margin:'auto'}
    return(
        <div>
            <Grid>
                <Paper elevation = {10} style = {paperStyle}>
                    <Grid align={'center'} >
                    <Avatar style={avatarStyle}><CelebrationIcon/></Avatar>
                        <h2>Register to the party!</h2>

                        <TextField 
                            margin='dense' 
                            label='First Name'
                            type='string'  
                            required 
                            id="filled-basic" 
                            variant="filled" 
                        />                    
                        
                        <TextField 
                            margin='dense' 
                            label='Last Name'
                            type='string'  
                            required 
                            id="filled-basic" 
                            variant="filled" 
                        />                    
                        
                        <TextField 
                            margin='dense' 
                            label='Email' 
                            type='email'
                            fullWidth 
                            required 
                            id="filled-basic" 
                            variant="filled" 
                        />                    

                        <TextField 
                            margin='dense' 
                            label='Date of Birth' 
                            type='date'
                            defaultValue="2017-05-24" 
                            InputLabelProps={{shrink: true,}} 
                            fullWidth 
                            required 
                            id="filled-basic" 
                            variant="filled" 
                        />

                        <TextField 
                            margin='dense' 
                            label='Username'
                            type='string' 
                            fullWidth 
                            required 
                            id="filled-basic" 
                            variant="filled" 
                        />                    

                        <TextField 
                            margin='dense' 
                            label='Phone number'
                            type='string' 
                            fullWidth 
                            required 
                            id="filled-basic" 
                            variant="filled" 
                        />                    
                        
                        <TextField 
                            margin='dense' 
                            label='Password' 
                            type='password' 
                            fullWidth 
                            required 
                            id="filled-basic" 
                            variant="filled" 
                        />
                        
                        <TextField 
                            margin='dense' 
                            label='Repeat Password' 
                            type='password' 
                            fullWidth 
                            required 
                            id="filled-basic" 
                            variant="filled" 
                        />

                        <FormControl margin='normal' component='fieldset'>
                            
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                <FormControlLabel 
                                    value="female" 
                                    control={<Radio />} 
                                    label="Female" 
                                />
                                <FormControlLabel 
                                    value="male" 
                                    control={<Radio />} 
                                    label="Male" 
                                />
                                <FormControlLabel 
                                    value="other" 
                                    control={<Radio />} 
                                    label="Other" 
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <h2/>
                    <Button fullWidth style={regStyle} type='submit' color='primary'  >REGISTER</Button>
                </Paper>
            </Grid>
        </div>
    )
}