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
import { gray } from '@mui/material/colors'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useNavigate } from "react-router-dom";
import AuthHeader from '../services/Auth-header';
import Auth from '../services/Auth';
import CommentIcon from '@mui/icons-material/Comment';
import PostView from "./PostView"


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

    //URLs for fetching data
    const API_URL = "http://localhost:8080/"
    const postUrl = "http://localhost:8080/api/post/sort/timeD"

    //Gets posts from BE
    React.useEffect(() => {
       if (currentUser === null) return navigate("/login")
        axios.get(postUrl, { headers: AuthHeader() }).then((response) => {
            setPosts(response.data)
            console.log(response.data)
            //axios.get(API_URL)
            //const postPic = response.image.split("/").reverse()
            //setImage(postUrl + postPic[0])
            setLoading(false)
            //console.log(response.data.postMediaName)
        }); 
    }, [])

    if (!posts) return console.log("tra kaua voib")

    //maps posts.postMediaName
    //let result = posts.map(({postMediaName}) => postMediaName)
    let result = posts.map(a => a.postMediaName)
    console.log(result)

    //stupid function to reformat names in postimage array
    var reformatImages = function(imgs) {
        return posts.map(function(imgs) {
        var newObj = {};
        newObj["img"] = imgs.postMediaName.split("/").reverse();
        return newObj;
        });
    };

    var imgArray = reformatImages(posts);
    console.log(imgArray);

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
                        const isEvent = post.isEvent
                        const handleRoute = () =>{ 
                            navigate("/viewpost/"+ post._id)
                            return <PostView/>
                          }
                        return(
                            <div>
                                <Card
                                    key={key}
                                    sx={{ minWidth: 760 }}
                                    margin='normal'
                                    style={cardStyle}
                                >
                                    <div
                                        style={{
                                            display: isEvent
                                                ? "block"
                                                : "none",
                                        }}
                                    >
                                        <Chip
                                            size="small" 
                                            style = {comments}
                                            sx={{ bgcolor: red[500]}}
                                            label="Event"
                                        />
                                        <h2/>
                                    </div>
                                    <Chip
                                        //onClick => post.user /profile
                                        size='big'
                                        avatar={
                                            <Avatar>
                                                {post.user.Avatar}
                                            </Avatar>
                                        }
                                        label={post.user.firstName, post.user.lastName}
                                    />
                                    {console.log(post._id)}
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
                                        media={image}
                                    />
                                    <CardContent>
                                        <Typography variant="body1" color="text.secondary">
                                            {post.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Typography variant="body3" aria-label="like">
                                            <ThumbUpAltIcon/>
                                            {" "}
                                            {post.likes}
                                        </Typography>
                                        <Typography variant="body3" style={white}>
                                            aaa
                                        </Typography>
                                        <Typography variant="body3" aria-label="dislike">
                                            <ThumbDownAltIcon />
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


