import React, { useState, useRef, useEffect } from "react";
import Auth from "../services/Auth";
import UserService from "../services/UserService";
import {
    Typography,
    Grid,
    Paper,
    Stack,
    Button,
    LinearProgress,
    Card,
    CardActions,
    IconButton,
    CardHeader
} from "@mui/material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { format, utcToZonedTime } from "date-fns-tz";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VoteService from "../services/VoteService";



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

const API_URL = "http://localhost:8080/avatar/";
var isAdminBool = false;

export default function Profile() {
    const location = useLocation();
    
    const navigate = useNavigate();
    
    
    // Logs user out and redirects to login page
    const onLogout = (e) => {
        e.preventDefault();
        Auth.logout();
        navigate("/login");
    };

    const [profile, setProfile] = React.useState([]);
    const [avatar, setAvatar] = React.useState();
    const [loading, setLoading] = useState(true);
    const [loadingImg, setLoadingImg] = useState(true);
    const [post, setPosts] = useState(false);
    const [value, setValue] = useState(false);

    // Gets user information from server
    useEffect(() => {
        const currentUser = Auth.getCurrentUser();
        if (currentUser === null || currentUser === undefined || !currentUser) return navigate("/login");
    if(!location.state) {
        var userId = currentUser.id} else {
            var userId = location.state.postId;
        }
        // console.log(value)
        //console.log(userId.length);
        
        if (!userId) {
            const userId = currentUser.id;
        }
        // setValue(prevState=>!prevState);
        UserService.getUserProfile(userId)
            .then((res) => {
                setProfile(res);
                const avatarPic = res.avatar.split("/").reverse();
                setAvatar(API_URL + avatarPic[0]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [value]);

    // While image Loads
    const counter = useRef(0);
    const imageLoaded = () => {
        counter.current += 1;
        setLoadingImg(false);
        if (profile.posts.length > 0) setPosts(true);
    };

    // Checks if user is admin
    const isAdmin = (e) => {
        e.preventDefault();
        isAdminBool = profile.roles.length > 1;
    };

    const handleLike = (e) => {
        e.preventDefault();
        VoteService.putLikeUser(profile._id)
            .then((res) => {
                setValue((prevState) => !prevState);
                // navigate("/profile", 0);
                // navigate("/profile", profile._id);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleDislike = (e) => {
        e.preventDefault();
        VoteService.putDislikeUser(profile._id)
            .then((res) => {
                setValue((prevState) => !prevState);
                // navigate("/profile", 0);
                // navigate("/profile", profile._id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // While profile information is not loaded yet
    if (loading) {
        return (
            <div>
                <Grid>
                    <Paper style={paperStyle}>
                        <Grid align={"center"}>
                            <Stack spacing={2}>
                                <LinearProgress />
                                
                            </Stack>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    }

    // When profile information is loaded
    return (
        <div onLoad={isAdmin}>
            <Grid>
                <Paper style={paperStyle}>
                    <Grid align={"center"}>
                        <Stack spacing={2}>
                            {/* If user is admin, displays it */}
                            <div
                                style={{
                                    display: loadingImg
                                        ? "block"
                                        : "none",
                                }}
                            >
                                Loading image
                            </div>
                            <div
                                style={{
                                    display: loadingImg
                                        ? "none"
                                        : "block",
                                }}
                            >
                                <img
                                    src={avatar}
                                    onLoad={imageLoaded}
                                    style={{
                                        width: 96,
                                        height: 96,
                                        margin: "auto",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: isAdminBool
                                        ? "block"
                                        : "none",
                                }}
                            >
                                <Typography
                                    display="inline-block"
                                    variant="h4"
                                >
                                    {profile.userName}
                                </Typography>
                                <Card
                                    display="inline-flex"
                                    align={"center"}
                                    sx={{
                                        backgroundColor: "rgb(234 7 7)",

                                        height: "55%",
                                        width: 100,
                                    }}
                                >
                                    {" "}
                                    Admin{" "}
                                </Card>
                            </div>
                            <div
                                style={{
                                    display: isAdminBool
                                        ? "none"
                                        : "block",
                                }}
                            >
                                <Typography variant="h4">
                                    {profile.userName}
                                </Typography>
                            </div>
                            <Typography variant="h6">
                                Gender: {profile.gender}
                            </Typography>
                            <Typography>
                                {format(
                                    new Date(profile.dateOfBirth),
                                    "dd-MM-yyyy"
                                )}
                            </Typography>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <CardActions>
                                    <IconButton
                                        aria-label="like"
                                        onClick={handleLike}
                                    >
                                        <ThumbUpAltIcon />
                                        {/* {posts.likes} */}
                                    </IconButton>
                                    <IconButton
                                        aria-label="dislike"
                                        onClick={handleDislike}
                                    >
                                        <ThumbDownAltIcon />
                                        {/* {posts.dislikes} */}
                                    </IconButton>
                                </CardActions>
                            </Grid>
                            <Typography>
                                Likes: {profile.likes} &nbsp; Dislikes:{" "}
                                {profile.dislikes}
                            </Typography>
                        </Stack>
                    </Grid>
                </Paper>
                <Paper style={paperStyle}>
                    <Grid align={"center"}>
                        <Typography variant="h6">
                            Posts by {profile.userName}
                        </Typography>
                    </Grid>
                </Paper>

                <div
                    style={{
                        display: post ? "block" : "none",
                    }}
                >
                    {profile.posts.map((post, key) => {
                        const handleRoute = () =>{ 
                            navigate("/viewpost/", {state:{postId: post._id}})
                            
                        }
                        return (
                            <Paper style={paperStyle} key={key}>
                                <Typography variant="h5">
                                    <CardHeader
                                        style={cursor}
                                        onClick = {handleRoute} 
                                        title={post.title}
                                        subheader={post.location}
                                    />
                                        
                                    
                                    <br />
                                    <Typography>
                                        {" "}
                                        Likes: {
                                            post.likes
                                        } Dislikes: {post.dislikes}{" "}
                                        &nbsp; Post added:{" "}
                                        {format(
                                            new Date(post.createdAt),
                                            "H:mm dd-MM-yyyy"
                                        )}{" "}
                                        @{post.location}{" "}
                                        
                                    </Typography>
                                    <Grid
                                            spacing={0}
                                            container
                                            direction={"row"}
                                            justifyContent="center"
                                        >
                                            {post.tags.map(
                                                (tag, tKey) => {
                                                    return (
                                                        <CardActions key={
                                                            tKey
                                                        }>
                                                            <Card
                                                                
                                                                align={
                                                                    "center"
                                                                }
                                                                sx={{
                                                                    backgroundColor:
                                                                        "#447a30",
                                                                    display:
                                                                        "block",
                                                                    
                                                                    width:
                                                                        tag.length *
                                                                        12,
                                                                        fontSize: '18px'
                                                                }}
                                                                
                                                            >
                                                                {" "}
                                                                {
                                                                    tag
                                                                }{" "}
                                                            </Card>
                                                        </CardActions>
                                                    );
                                                }
                                            )}
                                        </Grid>
                                </Typography>
                            </Paper>
                        );
                    })}
                </div>
                <div
                    style={{
                        display: post ? "none" : "block",
                    }}
                >
                    <Grid align={"center"}>
                        User hasn't posted yet!
                    </Grid>
                </div>
            </Grid>
        </div>
    );
}
