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
    Stack 
} from '@mui/material';
import { red } from '@mui/material/colors'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AuthHeader from "../services/Auth-header";
import Auth from "../services/Auth";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function PostView() {

    const paperStyle = {
        padding: 20,
        height: '100%',
        width: 960,
        margin: '20px auto'
    }
    const cardStyle = {
        padding: 20
    }

    const comments = {
        marginLeft: "auto"
    }

    const white = {
        color: "white"
    }


    const [post, setPost] = React.useState([])
    const [loading, setLoading] = useState(true)
    const [image, setImage] = React.useState()

    const postUrl = "http://localhost:8080/api/post/61b912ceccf25e59c264dba9"
    const imgUrl = "http://localhost:8080/"
    //cant get the uploads for some reason
    //const requestPost = axios.get(postUrl)
    //const requestImage = axios.get(imgUrl)

    const navigate = useNavigate();
    const currentUser = Auth.getCurrentUser();

    React.useEffect(() => {
        if (currentUser === null) return navigate("/login")
        axios.get(postUrl, { headers: AuthHeader() }).then((response) => {
            setPost(response.data)
            /*/
            const postPic = response.uploads.split("/").reverse()
            setImage(imgUrl + postPic[0])
            */
            setLoading(false)
            console.log(response.data)
        })
        /*
        axios.all([requestPost, requestImage], { headers: AuthHeader() }).then(axios.spread((...responses) => {
            const resPost = responses[0]
            const resImg = responses[1]
            setPost(resPost.data)
            const postPic = resImg.postMediaName.split("/").reverse()
            setImage()
        }))
        */
    }, [])

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

    const isEvent = post.isEvent

    return (
        <div>
            <Grid>
                <Paper
                    elevation={2}
                    style={paperStyle}
                >
                    <Card
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
                            size="big"
                            avatar={
                                <Avatar sx={{ width: 76, height: 76 }}>
                                    {post.user.Avatar}
                                </Avatar>
                            }
                            label={post.user.firstName, post.user.lastName}
                        />
                        <CardHeader

                            title={post.title}
                            subheader={post.location}
                        />
                        <CardMedia
                            style={{
                                width: "auto",
                                maxHeight: "200px"
                            }}
                            component={post.postMediaType}
                            image={post.postMediaName}
                            title="viin"
                        />
                        <CardContent>
                            <Typography variant="body1" color="text.primary">
                                {post.body}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="like">
                                <ThumbUpAltIcon />
                                {post.likes}
                            </IconButton>
                            <Typography variant="body3" style={white}>
                                aaa
                            </Typography>
                            <IconButton aria-label="dislike">
                                <ThumbDownAltIcon />
                                {post.dislikes}
                            </IconButton>
                            <IconButton aria-label="comment" style={comments} >
                                <AddCommentIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Paper>
                <Paper style = {paperStyle}>
                    <Typography>
                        Comments
                    </Typography>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        {post.comments.map((comment, key) => {
                            return(
                                <div>
                                    <Card
                                        key={key}
                                        sx={{ minWidth: 760 }}
                                        margin='normal'
                                        style={cardStyle}
                                    >
                                        <Chip
                                            size='big'
                                            avatar={
                                                <Avatar>
                                                    {comment.user.Avatar}
                                                </Avatar>
                                            }
                                            label={comment.user.firstName, comment.user.lastName}
                                        />
                                        <CardContent>
                                            <Typography variant="body1" color="text.primary">
                                                {comment.body}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        })}
                    </Stack>
                </Paper>
            </Grid>
        </div>
    )
}