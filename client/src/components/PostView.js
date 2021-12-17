import React, { useState } from "react";
import {
    Grid,
    LinearProgress,
    Paper,
    Card,
    CardActions,
    CardContent,
    Avatar,
    CardMedia,
    CardHeader,
    IconButton,
    Typography,
    Chip,
    Stack,
    TextField,
    Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Form from 'react-validation/build/form';
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from '@mui/icons-material/Edit';

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import VoteService from "../services/VoteService";
import AuthHeader from "../services/Auth-header";
import Auth from "../services/Auth";
import Profile from "./Profile";


export default function PostView() {
    const location = useLocation();
    const navigate = useNavigate();
    

    //style consts
    const paperStyle = {
        padding: 20,
        height: "100%",
        width: 960,
        margin: "20px auto",
    };
    const cardStyle = {
        padding: 20,
    };

    const comments = {
        marginLeft: "auto",
    };

    const white = {
        color: "white",
    };

    const cursor = {
        cursor: "pointer",
    };

    const [post, setPost] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = React.useState();
    const [value, setValue] = React.useState(false)
    const [input, setInput] = React.useState(false)
    const [postComment, setComment] = useState([])
    const [commentValue, setCommentValue] = React.useState(false)

    const imgUrl = "http://localhost:8080/";
    //cant get the uploads for some reason
    //const requestPost = axios.get(postUrl)
    //const requestImage = axios.get(imgUrl)

    const currentUser = Auth.getCurrentUser();
    
    React.useEffect(() => {
        if (
            !location.state ||
            location.state === null ||
            location.state === undefined
        ) {
        return navigate("/");
        }
        try{
            var postId = location.state.postId;
        } catch (e) {
            return navigate("/");
        }
        const postUrl = "http://localhost:8080/api/post/" + postId;
        console.log(postId);
    
        if (postId.length === undefined) return navigate("/");
        if (currentUser === null || currentUser === undefined){
            return navigate("/login");
        }
        axios
            .get(postUrl, { headers: AuthHeader() })
            .then((response) => {
                setPost(response.data);
                /*/
            const postPic = response.uploads.split("/").reverse()
            setImage(imgUrl + postPic[0])
            */
                setLoading(false);
                console.log(response.data);
            }).catch(e =>{
                return navigate("/");
            });
        
    }, [value], [commentValue]);


    

    if (loading) {
        return (
            <div>
                <Grid>
                    <Paper style={paperStyle}>
                        <LinearProgress />
                    </Paper>
                </Grid>
            </div>
        );
    }

    const isEvent = post.isEvent;

    const handleRoute = () => {
        navigate("/editpost/", { state: { postId: post._id } });
    };

    const postPic = post.postMediaName.split("/").reverse()
    const picUrl = imgUrl + postPic[0]

    const handleLike = (e) => {
        e.preventDefault();
        VoteService.putLikePost(post._id)
            .then((res) => {
                setValue((prevState) => !prevState)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDislike = (e) => {
        e.preventDefault();
        VoteService.putDislikePost(post._id)
            .then((res) => {
                setValue((prevState) => !prevState);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCommentLike = (e) => {
        e.preventDefault();
        VoteService.putLikeComment(post.comment._id)
            .then((res) => {
                setCommentValue((prevState) => !prevState)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleCommentDislike = (e) => {
        e.preventDefault();
        VoteService.putDislikeComment(post.comment._id)
            .then((res) => {
                setCommentValue((prevState) => !prevState)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleUser = () =>{
        navigate("/profile/", {state:{postId: post.user._id}})
        return <Profile/>
    }

    const onCommentChange = (e) => {
        const { name, value } = e.target;
        setComment({
            ...postComment,
            [name]: value,
            userId: currentUser.id
        });
        
        console.log(postComment)
    };

    const handleComment = (e) => {
        e.preventDefault();
        console.log(post._id,  postComment)
        VoteService.putComment(post._id,  postComment)
            
    }

    const handleInput = () => {
        setInput((prevState) => !prevState)
    }

    return (
        <div>
            <Grid>
                <Paper elevation={2} style={paperStyle}>
                    <Card
                        sx={{ minWidth: 760 }}
                        margin="normal"
                        style={cardStyle}
                    >
                        <div
                            style={{
                                display: isEvent ? "block" : "none",
                            }}
                        >
                            <Chip
                                size="small"
                                style={comments}
                                sx={{ bgcolor: red[500] }}
                                label="Event"
                            />
                            <h2 />
                        </div>
                        <Stack direction="row">
                            <Chip
                                onClick={handleUser}
                                size="big"
                                avatar={
                                    <Avatar sx={{ width: 76, height: 76 }}>
                                        {post.user.Avatar}
                                    </Avatar>
                                }
                                label={
                                    (post.user.firstName + " " +
                                    post.user.lastName)
                                }
                            />
                            <IconButton
                                onClick={handleRoute}
                                style={comments}
                                aria-label="comment"
                            >
                                <EditIcon />
                            </IconButton>
                        </Stack>                       
                        <CardHeader
                            title={post.title}
                            subheader={post.location}
                        />
                        <CardMedia
                            style={{
                                width: "auto",
                                maxHeight: "200px",
                            }}
                            component={post.postMediaType}
                            //image={post.postMediaName}
                            src={picUrl}
                            title="viin"
                        />
                        <CardContent>
                            <Typography
                                variant="body1"
                                color="text.primary"
                            >
                                {post.body}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton 
                                aria-label="like"
                                onClick={handleLike}
                            >
                                <ThumbUpAltIcon />
                                {post.likes}
                            </IconButton>
                            <Typography variant="body3" style={white}>
                                aaa
                            </Typography>
                            <IconButton 
                                aria-label="dislike"
                                onClick={handleDislike}    
                            >
                                <ThumbDownAltIcon />
                                {post.dislikes}
                            </IconButton>
                            <IconButton
                                onClick={handleInput}
                                aria-label="comment"
                                style={comments}
                            >
                                <AddCommentIcon />
                            </IconButton>
                            
                        </CardActions>
                    </Card>
                </Paper>

                <div
                    //Add Comment display toggle
                    style={{
                        display: input ? "block" : "none",
                    }}
                >
                    <form onSubmit={handleComment} >
                        <Paper style={paperStyle}>
                            <Chip 
                                size="big"
                                avatar={
                                    <Avatar sx={{ width: 76, height: 76 }}>
                                            {currentUser.Avatar}
                                    </Avatar>
                                }
                                label={currentUser.userName}
                            />
                            <h2/>
                            
                            
                                <Stack direction="row" spacing={2}>
                                    <TextField 
                                        fullWidth
                                        id="body"
                                        name="body"
                                        label="Add Comment"
                                        required
                                        onChange={onCommentChange}
                                    />
                                    <Button
                                        style={comments}
                                        variant="contained"
                                        type="submit"
                                    >
                                        Post
                                    </Button>
                                </Stack>
                        </Paper>
                    </form>
                </div>

                <Paper style={paperStyle}>
                    <Typography>Comments</Typography>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        {post.comments.map((comment, key) => {
                            return (
                                <div>
                                    <Card
                                        key={key}
                                        sx={{ minWidth: 760 }}
                                        margin="normal"
                                        style={cardStyle}
                                    >
                                        <Chip
                                            size="big"
                                            avatar={
                                                <Avatar>
                                                    {
                                                        comment.user
                                                            .Avatar
                                                    }
                                                </Avatar>
                                            }
                                            label={
                                                (comment.user.firstName +
                                                comment.user.lastName)
                                            }
                                        />
                                        <CardContent>
                                            <Typography
                                                variant="body1"
                                                color="text.primary"
                                            >
                                                {comment.body}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                        <IconButton 
                                            aria-label="commentLike"
                                            onClick={handleCommentLike}
                                        >
                                            <ThumbUpAltIcon />
                                            {comment.likes}
                                        </IconButton>
                                        <Typography variant="body3" style={white}>
                                            aaa
                                        </Typography>
                                        <IconButton 
                                            aria-label="commentDislike"
                                            onClick={handleCommentDislike}    
                                        >
                                            <ThumbDownAltIcon />
                                            {comment.dislikes}
                                        </IconButton>
                                    </CardActions>
                                    </Card>
                                </div>
                            );
                        })}
                    </Stack>
                </Paper>
            </Grid>
        </div>
    );
}
