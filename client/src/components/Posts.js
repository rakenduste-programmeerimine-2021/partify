import React, { useState, useEffect } from "react"
import axios from 'axios'
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Avatar,
    IconButton,
    LinearProgress,
    Paper,
    Grid,
    Stack,
    Typography,
    Chip
} from '@mui/material'
import { red } from '@mui/material/colors'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from "react-router-dom";
import AuthHeader from '../services/Auth-header';
import Auth from '../services/Auth';
import CommentIcon from '@mui/icons-material/Comment';
import PostView from "./PostView"
import Profile from "./Profile"


export default function Posts() {

    //styling consts 
    const cardStyle = {
        padding: 20
    }

    const paperStyle = {
        padding: 20,
        height: '100%',
        width: 860,
        margin: '20px auto'
    }
    const comments = {
        marginLeft: 'auto'
    }

    const white = {
        color: "white"
    }

    const cursor = {
        cursor: "pointer"
    }

    //states
    const [posts, setPosts] = React.useState([])
    const [loading, setLoading] = useState(true)
    const [image, setImage] = React.useState()
    const navigate = useNavigate();
    const currentUser = Auth.getCurrentUser();
    const [img, setImg] = useState()

    //URLs for fetching data
    const API_URL = "http://localhost:8080/"
    const postUrl = "http://localhost:8080/api/post/sort/timeD"

    //Gets posts from BE
    React.useEffect(() => {
        if (currentUser === null || currentUser === undefined) return navigate("/login")
        axios.get(postUrl, { headers: AuthHeader() }).then((response) => {
            setPosts(response.data)
            //axios.get(API_URL)
            // const postPic = response.data.postMediaName.split("/").reverse()
            // window.alert(postPic)
            //setImage(postUrl + postPic[0])
            setLoading(false)
            //console.log(response.data.postMediaName)
        }); 
    }, [])

    if (!posts) return console.log("tra kaua voib")

    //maps posts.postMediaName
    //let result = posts.map(({postMediaName}) => postMediaName)
    let result = posts.map(a => a.postMediaName)
    

    //stupid function to reformat names in postimage array
    // var reformatImages = function(imgs) {
    //     return posts.map(function(imgs) {
    //     var newObj = {};
    //     newObj["img"] = imgs.postMediaName.split("/").reverse();
    //     return newObj;
    //     });
    // };

    // var imgArray = reformatImages(posts);
    // console.log(imgArray);

    // Gets post image from BE
    /*var postImage
    const loadImages = () => {posts.map((post) =>
        postImage = post.postMediaName.split("/").reverse(),
        setImage(API_URL + postImage[0]),
        console.log(image)
    )}*/
    /*useEffect(() => {
        axios.get(API_URL)
            .then((res) => {
                //const postPic = res.image.split("/").reverse();
                setImage(API_URL + imgArray[0]);
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            });
            
    }, []);*/
    

    //While posts load
    if (loading) {
        return (
            <div>
                <Grid>
                    <Paper style={paperStyle}>
                        <LinearProgress />
                    </Paper>
                </Grid>
            </div>
        )
    }


    /*goToPost(e){
        Redirect to="/viewpost + {id}" 
    }*/

    //When posts are loaded
    return (
        <Grid>
            <Paper elevation={2} style={paperStyle}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {posts.map((post, key) => {
                        const postPic = post.postMediaName.split("/").reverse()
                        const picUrl = API_URL + postPic[0]
                        // console.log(picUrl)
                        const isEvent = post.isEvent
                        const handleRoute = () =>{ 
                            navigate("/viewpost/", {state:{postId: post._id}})
                            return <PostView/>
                        }
                        const handleUser = () =>{
                            navigate("/profile/", {state:{postId: post.user._id}})
                            return <Profile/>
                        }
                        return(
                            <div key={key}>
                                <Card
                                    
                                    sx={{ minWidth: 760 }}
                                    margin='normal'
                                    style={cardStyle}
                                >
                                    <Stack direction="row">
                                        <Chip
                                            onClick={handleUser}
                                            size='big'
                                            avatar={
                                                <Avatar>
                                                    {post.user.Avatar}
                                                </Avatar>
                                            }
                                            label={post.user.userName}
                                        />

                                    <div
                                        style={{
                                            display: isEvent
                                                ? "block"
                                                : "none",
                                            marginLeft:"auto"
                                        }}
                                    >
                                        <Chip
                                            size="small" 
                                            sx={{ bgcolor: red[500]}}
                                            label="Event"
                                        />
                                    
                                    </div>
                                    </Stack>
                                   
                                    
                                    
                                    <CardHeader
                                        style={cursor}
                                        onClick = {handleRoute} 
                                        title={post.title}
                                        subheader={post.location}
                                    />
                                    <CardMedia
                                            style={{
                                                width: "auto",
                                                maxHeight: "200px"
                                            }}
                                            component={post.postMediaType}
                                            src={picUrl}
                                            controls
                                            alt="post"
                                        />
                                    
                                    {/* <img style={{
                                            width: "auto",
                                            maxHeight: "200px"
                                        }} src={API_URL + postPic[0]}  /> */}
                                    <CardContent>
                                        <Typography variant="body1" color="text.primary">
                                            {post.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Typography  aria-label="like">
                                            Likes: 
                                            {" "}
                                            {post.likes}
                                        </Typography>
                                        <Typography variant="body3" style={white}>
                                            a
                                        </Typography>
                                        <Typography aria-label="dislike">
                                            Dislikes: 
                                            {" "}
                                            {post.dislikes}
                                        </Typography>
                                        <IconButton onClick={handleRoute} style={comments} aria-label="comment" >
                                            <CommentIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </div>
                        );
                    })}
                </Stack>
            </Paper>
        </Grid>
    );

}


