import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
    Stack,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Form from "react-validation/build/form";
import Auth from "../services/Auth";
import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 360,
    margin: "20px auto",
};


const avatarStyle = { color: "#b3ff00", backgroundColor: "white" };

export default function Login() {
    const form = useRef();
    const checkBtn = useRef();

    const defaultValues = {
        email: "",
        password: "",
        loading: false,
        message: "",
    };

    const [formValues, setFormValues] = useState(defaultValues);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setFormValues({
            message: "",
            loading: true,
        });

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            Auth.login(formValues.email, formValues.password).then(
                () => {
                    navigate("/");
                },
                (error) => {
                    if (error.response.data.message) {
                        const resMessage =
                            error.response &&
                            error.response.data &&
                            error.response.data.message;
                        setFormValues({
                            message: resMessage,
                            loading: false,
                            email: "",
                            password: "",
                        });
                    } else {
                        const resMessage =
                            error.response.data.msg[0].msg;
                        setFormValues({
                            message: resMessage,
                            loading: false,
                            email: "",
                            password: "",
                        });
                    }
                }
            );
        } else {
            setFormValues({
                loading: false,
            });
        }
    };

    return (
        <div>
            <Form onSubmit={handleLogin} ref={form}>
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align={"center"}>
                            <Avatar style={avatarStyle}>
                                <CelebrationIcon />
                            </Avatar>
                            <h2>Welcome to the party!</h2>
                        </Grid>
                        <Stack spacing={2}>
                            <Grid item>
                                <Grid item>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        validations={[required]}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        validations={[required]}
                                    />
                                </Grid>
                                <h2 />
                                <Grid item>
                                    {" "}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Log in
                                    </Button>
                                </Grid>
                                <Grid>
                                    <h2 />
                                    {formValues.message && (
                                        <div className="form-group">
                                            <div
                                                className="alert alert-danger"
                                                role="alert"
                                            >
                                                {formValues.message}
                                            </div>
                                        </div>
                                    )}
                                    <Typography sx={{ flexGrow: 1 }}>
                                        Don't have an account?
                                        <NavLink
                                            to="/register"
                                            underline="hover"
                                        >
                                            Register
                                        </NavLink>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Paper>
                </Grid>
                <CheckButton
                    style={{ display: "none" }}
                    ref={checkBtn}
                />
            </Form>
        </div>
    );
}
