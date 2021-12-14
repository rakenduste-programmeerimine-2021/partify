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
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { format, utcToZonedTime } from "date-fns-tz";

const paperStyle = {
    padding: 20,
    height: "100%",
    width: 760,
    margin: "20px auto",
};

const API_URL = "http://localhost:8080/avatar/";
var isAdminBool = false;

export default function Profile(newSetting) {
    const navigate = useNavigate();
    const currentUser = Auth.getCurrentUser();
    

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

    // Gets user information from BE
    useEffect(() => {
        if (currentUser === null) return navigate("/login")
        UserService.getUserProfile(currentUser.id)
            .then((res) => {
                setProfile(res);
                const avatarPic = res.avatar.split("/").reverse();
                setAvatar(API_URL + avatarPic[0]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [newSetting]);

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

    // While profile information is not loaded yet
    if (loading) {
        return (
            <div>
                <Grid>
                    <Paper style={paperStyle}>
                        <Grid align={"center"}>
                            <Stack spacing={2}>
                                <LinearProgress />
                                <Button onClick={onLogout}>
                                    Logout
                                </Button>
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
                            <Typography>
                                Likes: {profile.likes} &nbsp; Dislikes:{" "}
                                {profile.dislikes}
                            </Typography>
                            <Grid item>
                                        {" "}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={onLogout}
                                        >
                                            Logout
                                        </Button>
                                    </Grid>
                            
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
                        return (
                            <Paper style={paperStyle} key={key}>
                                <Typography  variant="h5">
                                    <NavLink
                                        to="/register"
                                        underline="hover"
                                    >
                                        {post.title}
                                    </NavLink>
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
                                        @{post.location}
                                    </Typography>
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
