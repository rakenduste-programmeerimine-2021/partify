import React, { useState, useRef, useEffect } from "react";
import Auth from "../services/Auth";
import UserService from "../services/UserService";
import AuthService from "../services/Auth";
import {
    Typography,
    Grid,
    Paper,
    Stack,
    Button,
    LinearProgress,
    TextField,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const paperStyle = {
    padding: 20,
    height: "100%",
    width: 760,
    margin: "20px auto",
};

const API_URL = "http://localhost:8080/avatar/";

export default function Settings() {
    const currentUser = Auth.getCurrentUser();

    const defaultValues = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        gender: "",
        phone: 0,
        id: "",
    };

    const [avatar, setAvatar] = React.useState();
    const [loading, setLoading] = useState(true);
    const [loadingImg, setLoadingImg] = useState(true);
    const [formValues, setFormValues] = useState(defaultValues);
    const [messages, setMessages] = useState("");
    const navigate = useNavigate();

    // Load user info

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.putUserProfile(formValues)
            .then((res) => {
                setMessages("");
                navigate("/profile", 3);
            })
            .catch((error) => {
                
                if (error.response.data.message) {
                    const resMessage =
                        error.response &&
                        error.response.data &&
                        error.response.data.message;
                    setMessages(resMessage);
                } else if(error.response.data){
                    const resMessage = error.response.data
                    setMessages(resMessage);
                }else {
                    const resMessage = error.response.data.msg[0].msg;
                    setMessages(resMessage);
                }
            });
    };

    const addUserInfo = (res) => {
        setFormValues({
            firstName: res.firstName,
            lastName: res.lastName,
            userName: res.userName,
            email: res.email,
            gender: res.gender,
            phone: res.phone,
            id: res._id,
        });
    };

    useEffect(() => {
        if (currentUser === null || currentUser === undefined) return navigate("/login");
        UserService.getUserProfile(currentUser.id)
            .then((res) => {
                const avatarPic = res.avatar.split("/").reverse();
                setAvatar(API_URL + avatarPic[0]);
                setLoading(false);
                addUserInfo(res);
            })
            .catch((error) => {
                navigate("/settings");
            });
    }, []);

    const counter = useRef(0);
    const imageLoaded = () => {
        counter.current += 1;
        setLoadingImg(false);
    };

    // Change avatar

    const [selectedImage, setSelectedImage] = useState();

    const [isImagePicked, setIsImagePicked] = useState(false);

    const handleImageSubmit = (e) => {
        e.preventDefault();
        UserService.putNewUserAvatar(selectedImage);
        navigate("/profile", 3);
    };

    const onImageChange = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
        setSelectedImage({
            postFile: e.target.files[0],
            id: formValues.id,
        });
        setIsImagePicked(true);
    };

    // Account deletion

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        UserService.deleteUser(formValues.id);
        AuthService.logout();
        navigate("/login");
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

    // When profile info is loaded
    return (
        <div>
            <Grid>
                <Paper style={paperStyle}>
                    <Grid align={"center"}>
                        <Stack spacing={2}>
                            <Grid item>
                                <Typography variant="h4">
                                    Change avatar
                                </Typography>
                            </Grid>
                            {/* Avatar change */}
                            <form onSubmit={handleImageSubmit}>
                                <div>
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
                                                accept="image/*"
                                                id="postFile"
                                                type="file"
                                                onChange={onImageChange}
                                            />
                                        </Typography>
                                    </Grid>
                                    <div
                                        style={{
                                            display: isImagePicked
                                                ? "block"
                                                : "none",
                                        }}
                                    >
                                        <Grid item>
                                            {" "}
                                            <Button
                                                style={{
                                                    top: 3,
                                                    margin: "auto",
                                                }}
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                            >
                                                Change Avatar
                                            </Button>
                                        </Grid>
                                    </div>
                                </div>
                            </form>
                        </Stack>
                    </Grid>
                </Paper>
                <Paper style={paperStyle}>
                    <Grid align={"center"}>
                        <Stack spacing={2}>
                            {/* Profile change */}
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <Grid item>
                                        <Typography variant="h4">
                                            Change profile
                                        </Typography>
                                    </Grid>
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
                                    <Grid item>
                                        <TextField
                                            id="first-name"
                                            name="firstName"
                                            label="First Name"
                                            type="text"
                                            multiline
                                            required
                                            value={formValues.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="last-name"
                                            name="lastName"
                                            label="Last Name"
                                            type="text"
                                            required
                                            multiline
                                            value={formValues.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="username"
                                            name="userName"
                                            label="Username"
                                            type="text"
                                            required
                                            multiline
                                            value={formValues.userName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                            required
                                            multiline
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            label="Phone"
                                            multiline
                                            required
                                            type="number"
                                            value={formValues.phone}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControl>
                                            <FormLabel>
                                                Gender
                                            </FormLabel>
                                            <RadioGroup
                                                name="gender"
                                                value={
                                                    formValues.gender
                                                }
                                                onChange={
                                                    handleInputChange
                                                }
                                                row
                                            >
                                                <FormControlLabel
                                                    key="Male"
                                                    value="Male"
                                                    control={
                                                        <Radio size="small" />
                                                    }
                                                    label="Male"
                                                />
                                                <FormControlLabel
                                                    key="Female"
                                                    value="Female"
                                                    control={
                                                        <Radio size="small" />
                                                    }
                                                    label="Female"
                                                />
                                                <FormControlLabel
                                                    key="Other"
                                                    value="Other"
                                                    control={
                                                        <Radio size="small" />
                                                    }
                                                    label="Other"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        {" "}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Stack>
                            </form>
                        </Stack>
                    </Grid>
                </Paper>
                <Paper style={paperStyle}>
                    <Grid align={"center"}>
                        <Stack spacing={2}>
                            {/* Account deletion */}
                            <form onSubmit={handleDeleteSubmit}>
                                <Stack spacing={2}>
                                    <Grid item>
                                        <Typography
                                            style={{ color: "red" }}
                                            variant="h4"
                                        >
                                            DELETE ACCOUNT
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            Once deleted, your account
                                            can't be recovered!
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
                                </Stack>
                            </form>
                        </Stack>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
