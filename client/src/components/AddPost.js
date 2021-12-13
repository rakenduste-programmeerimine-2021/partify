import React, { Component } from "react";
import { Grid, Paper, TextField, Typography, Avatar, Checkbox, FormControlLabel, Button, IconButton} from '@mui/material'
import { red } from '@mui/material/colors'
import ImageIcon from '@mui/icons-material/Image'
import PostService from "../services/PostService";
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';

const paperStyle = {padding: 20, height:'100%', width:560, margin:'20px auto'}
const inputStyle = {margin:"20"}
const locations = ['Tallinn', 'Tartu', 'P2rnu']


export default class AddPost extends Component {
    
    constructor (props) {
        super(props)
        this.handlePost = this.handlePost.bind(this)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeBody = this.onChangeBody.bind(this)
        this.onChangeEvent = this.onChangeEvent.bind(this)
        //this.onAddMedia = this.onAddMedia.bind(this)
        this.onChangeLocation = this.onChangeLocation.bind(this)

        this.state = {
            title: "",
            body: "",
            media: "",
            isEvent: false,
            tags: [],
            location: "",
            likes: 0,
            dislikes: 0,
            comments: [],
            user: this.user
        }
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        })
    }

    onChangeBody(e){
        this.setState({
            body: e.target.value
        })
    }

    onChangeEvent(e){
        this.setState({
            isEvent: e.target.value
        })
    }

    onChangeLocation(e){
        this.setState({
            location: e.target.value
        })
    }

    handlePost(e){
        e.preventDefault()

        this.setState({
            message:"",
            successful: false
        })

        this.form.validateAll()

        if(this.checkBtn.context._errors.length === 0 ) {
            PostService.createPost(
                this.state.body,
                this.state.media,
                this.state.title,
                this.state.location,
                this.state.tags,
                this.state.likes,
                this.state.user,
                this.state.isEvent,
                this.state.comments
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    })
                },
                error => {
                    const resMessage = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                    
                    this.setState({
                        successful: false,
                        message: resMessage
                    })
                }
            )
        }
    }

    render(){
        return(
            <div>
                <Form onSubmit={this.handlePost}
                ref={c => {
                    this.form = c
                }}>
                    <Grid align={'center'}>
                        <Paper elevation={4} style={paperStyle} >
                            <h2>What's up? </h2>

                        </Paper>
                        <Paper elevation={4} style={paperStyle}>
                            <Grid>
                                <Avatar sx = {{bgcolor: red[500]}} margin="auto">M</Avatar>
                            </Grid>
                            <h2/>
                            
                            <h2/>
                            <TextField
                                id="outlined"
                                label="Title"
                                fullWidth
                                style={inputStyle}
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                            />
                            <h2 />
                            <Grid rowSpacing={2}>
                                <TextField
                                    id="outlined"
                                    label="Location"
                                    style={inputStyle}
                                    value={this.state.location}
                                    onChange={this.onChangeLocation}
                                />
                            </Grid>
                            <IconButton margin="left">
                                    <ImageIcon/>
                                    <Typography>Add Media</Typography>
                                    <input
                                    type="file"
                                    hidden
                                    value={this.state.media}
                                    
                                    />
                                </IconButton>
                            <FormControlLabel 
                            control={<Checkbox />} 
                            label="This is an event" 
                            value={this.state.isEvent}                            
                            onChange={this.onChangeEvent}
                            />

                            <h2/>
                            <TextField
                                id="outlined-multiline-static"
                                label="Body"
                                multiline
                                rows={10}
                                fullWidth
                                value={this.state.body}
                                onChange={this.onChangeBody}
                            />
                            
                            <h2 />
                            <CheckButton
                                    style={{ display: "none" }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />
                            <Button fullWidth type="submit">Post</Button>
                        </Paper>
                    </Grid>
                </Form>
            </div>
        )
    }
}