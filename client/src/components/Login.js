import React, { Component } from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import CelebrationIcon from '@mui/icons-material/Celebration';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Auth from "../services/Auth";

const required = value => {
    if (!value) {
        return(
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

    const paperStyle={padding: 20, height: '70vh', width:360, margin:'20px auto'}
    const avatarStyle={color:'#b3ff00', backgroundColor:'white'}

export default class Login extends Component {
    
    constructor(props){
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)

        this.state = {
            email:"",
            password:"",
            loading: false,
            message:""
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin(e) {
        e.preventDefault()

        this.setState({
            message:"",
            loading: true
        })

        this.form.validateAll()        

        if (this.checkBtn.context._errors.length === 0) {
            Auth.login(this.state.email, this.state.password).then(
                () => {
                    alert("dima")
                    this.props.history.push('/')
                    window.location.reload()
                },
                error => {
                    const resMessage = 
                    (error.response && 
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()

                    this.setState({
                        loading: false,
                        message: resMessage
                    })
                }
            )
        } else {
            console.log("pizdec")
            this.setState({
                loading: false
            })
        }
    }

    render(){
        return(
            <div>
                <Form
                    onSubmit={this.handleLogin}
                    ref={c => { this.form = c}}
                    >
                    <Grid>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid align={'center'}>
                                <Avatar style={avatarStyle}><CelebrationIcon/></Avatar>
                                <h2>Welcome to the party!</h2>
                            </Grid>
                            <TextField 
                                margin='normal' 
                                label='Email' 
                                fullWidth 
                                required 
                                id="filled-basic" 
                                variant="filled"
                                value = {this.state.email}
                                onChange = {this.onChangeEmail}
                                validations = {[required]} 
                            />                    
                            <TextField 
                                margin='normal' 
                                label='Password' 
                                type='password' 
                                fullWidth 
                                required 
                                id="filled-basic" 
                                variant="filled"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]} 
                            />
                            <h2/>
                            <Grid>
                                <Button 
                                type='submit' 
                                color='primary'  
                                fullWidth
                                disabled={this.state.loading}
                                >
                                    LOG IN
                                </Button>
                                <h2/>
                                <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                                />
                                <Typography sx={{ flexGrow: 1 }}>
                                    Don't have an account?  
                                    <Link href='/register' underline="hover">Register</Link>
                                </Typography>
                            </Grid>
                            
                        </Paper>
                    </Grid>
                </Form>
            </div>
        )
    }
}