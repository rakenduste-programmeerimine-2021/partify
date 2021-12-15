import React, { useState, useRef, useEffect } from "react";
import {
    Grid,
    Paper,
    TextField,
    Typography,
    Avatar,
    Checkbox,
    FormControlLabel,
    Button,
    IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ImageIcon from "@mui/icons-material/Image";
import PostService from "../services/PostService";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { NavLink, useNavigate } from "react-router-dom";
import Auth from "../services/Auth";
import UserService from "../services/UserService";

const paperStyle = {
    padding: 20,
    height: "100%",
    width: 560,
    margin: "20px auto",
};
const inputStyle = { margin: "20" };
const API_URL = "http://localhost:8080/";

export default function AddPost() {
    const defaultValues = {
        title: "",
        location: "",
        tags: "",
        image: "",
        body: "",
        isEvent: false,
    };
    const [messages, setMessages] = useState("");
    const navigate = useNavigate();
    const currentUser = Auth.getCurrentUser();

    const [post, setPost] = useState();
    useEffect(() => {
        if (currentUser === null) return navigate("/login");
    }, []);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!post) setMessages("Fill all the fields!");
        PostService.createPost(post)
            .then((res) => {
                navigate("/profile");
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
        if (name === "image") {
            setPost({
                ...post,
                [name]: e.target.files[0],
            });
        } else if (name === "isEvent") {
            setPost({
                ...post,
                [name]: e.target.checked,
            });
        } else {
            setPost({
                ...post,
                [name]: value,
            });
        }
    };

    const [selectedImage, setSelectedImage] = useState();
    const [isImagePicked, setIsImagePicked] = useState(false);

    return (
        <div>
            <Form onSubmit={handlePostSubmit}>
                <Grid align={"center"}>
                    <Paper elevation={4} style={paperStyle}>
                        <h2>What's up? </h2>
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
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            fullWidth
                            style={inputStyle}
                            required
                            onChange={onPostChange}
                        />
                        <h2 />
                        <Grid>
                            <TextField
                             fullWidth
                                id="location"
                                name="location"
                                label="Location"
                                style={inputStyle}
                                required
                                onChange={onPostChange}
                            />
                        </Grid>
                        <h2 />
                        <Grid rowSpacing={2}>
                            <Typography>
                                <label for="tags">
                                    Separate tags with commas
                                </label>
                                <TextField
                                    id="tags"
                                    fullWidth
                                    name="tags"
                                    label="Tags"
                                    style={inputStyle}
                                    required
                                    onChange={onPostChange}
                                />
                            </Typography>
                        </Grid>
                        <h2 />
                        <Grid
                            item
                            xs
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Typography>
                                <input
                                    accept="image/*, video/* "
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={onPostChange}
                                    required
                                />
                            </Typography>
                        </Grid>
                        <h2 />
                        <FormControlLabel
                            control={<Checkbox />}
                            id="isEvent"
                            name="isEvent"
                            label="This is an event"
                            onChange={onPostChange}
                        />
                        <h2 />
                        <TextField
                            id="body"
                            name="body"
                            label="Body"
                            multiline
                            rows={10}
                            fullWidth
                            required
                            onChange={onPostChange}
                        />

                        <h2 />
                        <Button fullWidth type="submit">
                            Post
                        </Button>
                    </Paper>
                </Grid>
            </Form>
        </div>
    );
}
