import React, { useState, useEffect } from "react";
import {
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    LinearProgress,
} from "@mui/material";

import PostService from "../services/PostService";

import {  useNavigate, useLocation } from "react-router-dom";
import Auth from "../services/Auth";
import axios from "axios";
import AuthHeader from "../services/Auth-header";

const paperStyle = {
    padding: 20,
    height: "100%",
    width: 560,
    margin: "20px auto",
};




const inputStyle = { margin: "20" };

export default function EditPost() {
    const location = useLocation();


    const [messages, setMessages] = useState("");
    const navigate = useNavigate();
    const currentUser = Auth.getCurrentUser();
    const [loading, setLoading] = useState(true);

    try {
        var postId = location.state.postId;
    } catch (e) {
        navigate("/");
    }

    const postUrl = "http://localhost:8080/api/post/" + postId;

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        }
        if (!postId) return navigate("/");
        if (currentUser === null || currentUser === undefined) return navigate("/login");
        axios
            .get(postUrl, { headers: AuthHeader() })
            .then((response) => {
                setNewPost({
                    id: response.data._id,
                    title: response.data.title,
                    location: response.data.location,
                    tags: response.data.tags,
                    body: response.data.body,
                    userId: currentUser.id,
                });
                if (response.data.user._id !== currentUser.id)
                    return navigate("/");
                setLoading(false);
            });
    }, []);
    const [newPost, setNewPost] = React.useState([]);

    const handlePostSubmit = (e) => {
        e.preventDefault();

        if (!newPost) setMessages("Fill all the fields!");
        PostService.putPost(newPost)
            .then((res) => {
                navigate("/viewpost/", { state: { postId: postId } });
            })
            .catch((error) => {
                if (error.response.data.message) {
                    const resMessage =
                        error.response &&
                        error.response.data &&
                        error.response.data.message;
                    setMessages(resMessage);
                } else {
                    const resMessage = error.response.data.msg[0].msg;
                    setMessages(resMessage);
                }
            });
    };

    const onPostChange = (e) => {
        const { name, value } = e.target;
        if (name === "isEvent") {
            setNewPost({
                ...newPost,
                [name]: e.target.checked,
            });
        } else {
            setNewPost({
                ...newPost,
                [name]: value,
            });
        }
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        PostService.deletePost(postId);
        return navigate("/profile");
    };

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

    return (
        <div>
            <form onSubmit={handlePostSubmit}>
                <Grid align={"center"}>
                    <Paper elevation={4} style={paperStyle}>
                        <h2>Edit your post </h2>
                    </Paper>
                    <Paper elevation={4} style={paperStyle}>
                        <Grid>
                            <h2 />
                            {messages && (
                                <div className="form-group">
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {messages}
                                    </div>
                                </div>
                            )}
                        </Grid>

                        <h2 />
                        <Grid item>
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                fullWidth
                                style={inputStyle}
                                required
                                value={newPost.title}
                                inputProps={{
                                    maxLength: 96,
                                }}
                                onChange={onPostChange}
                            />
                        </Grid>
                        <h2 />
                        <Grid item>
                            <TextField
                                fullWidth
                                id="location"
                                name="location"
                                label="Location"
                                value={newPost.location}
                                style={inputStyle}
                                required
                                inputProps={{
                                    maxLength: 96,
                                }}
                                onChange={onPostChange}
                            />
                        </Grid>
                        <h2 />
                        <Grid item>
                            <Typography>
                                <label htmlFor="tags">
                                    Separate tags with commas
                                </label>
                            </Typography>
                            <TextField
                                id="tags"
                                fullWidth
                                name="tags"
                                label="Tags"
                                value={newPost.tags}
                                style={inputStyle}
                                required
                                inputProps={{
                                    maxLength: 96,
                                }}
                                onChange={onPostChange}
                            />
                        </Grid>
                        <h2 />

                        <h2 />
                        <Grid item>
                            <TextField
                                id="body"
                                name="body"
                                label="Body"
                                multiline
                                inputProps={{
                                    maxLength: 256,
                                }}
                                rows={6}
                                value={newPost.body}
                                fullWidth
                                required
                                onChange={onPostChange}
                            />
                        </Grid>

                        <h2 />
                        <Button fullWidth type="submit">
                            Post
                        </Button>
                    </Paper>
                </Grid>
            </form>

            <Paper style={paperStyle}>
                <Grid align={"center"}>
                    {/* Post deletion */}
                    <form onSubmit={handleDeleteSubmit}>
                        <Grid item>
                            <Typography
                                style={{ color: "red" }}
                                variant="h4"
                            >
                                DELETE POST
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Once deleted, your post can't be
                                recovered!
                            </Typography>
                        </Grid>
                        <Grid item>
                            {" "}
                            <Button
                                variant="contained"
                                color="error"
                                type="submit"
                            >
                                DELETE
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Paper>
        </div>
    );
}
