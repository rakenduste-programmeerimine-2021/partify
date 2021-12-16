import React, { useState, useRef } from "react";
import {
    TextField,
    Grid,
    Paper,
    Avatar,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Auth from "../services/Auth";
import { useNavigate } from "react-router-dom";

// const goToLog = () =>{
//     const navigate = useNavigate();
// }

//styles
const paperStyle = {
    padding: 20,
    height: "100%",
    width: 560,
    margin: "20px auto",
};
const avatarStyle = { color: "#b3ff00", backgroundColor: "white" };
const regStyle = { margin: "auto" };

//consts
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const vDateofBirth = (value) => {
    let today = new Date();
    let dob = this.state.value;
    let age = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18) {
        return (
            <div className="alert alert-danger" role="alert">
                You must be at least 18 years old to register!
            </div>
        );
    } else if (age < 130) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter a valid Date of Birth.
            </div>
        );
    }
};

const vPhone = (value) => {
    if (value < 7 || value > 8) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter a valid phone number.
            </div>
        );
    }
};

export default function Register() {
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    const defaultValues = {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
        dateOfBirth: new Date().toLocaleString(),
        gender: "Female",
    };

    const [formValues, setFormValues] = useState(defaultValues);
    const [message, setMessage] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        form.current.validateAll();

        console.log(formValues)

        if (formValues.password !== formValues.confirm_password) {
            checkBtn.current.context._errors.length += 1;
            setMessage({
                message: "Passwords don't match"
            });
        }

        if (checkBtn.current.context._errors.length === 0) {
            Auth.register(formValues).then(
                (response) => {
                    console.log("11111")
                    // setFormValues(defaultValues);
                    setMessage({
                        message: response.data.message,
                        successful: true,
                    });
                    return navigate("/");
                },
                (error) => {
                    console.log(error);
                    // setFormValues(defaultValues);
                    if (error.response.data.message) {
                        const resMessage =
                            error.response &&
                            error.response.data &&
                            error.response.data.message;
                            setMessage({
                            message: resMessage,
                            successful: true,
                        });
                    } else {
                        const resMessage =
                            error.response.data.msg[0].msg;
                            setMessage({
                            message: resMessage,
                            successful: true,
                        });
                    }
                }
            );
        }
    };

    return (
        <div>
            <Form onSubmit={handleRegister} ref={form}>
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align={"center"}>
                            <Avatar style={avatarStyle}>
                                <CelebrationIcon />
                            </Avatar>
                            <h2>Register to the party!</h2>

                            <TextField
                                margin="dense"
                                name="firstName"
                                label="First Name"
                                type="string"
                                required
                                id="filled-basic"
                                variant="filled"
                                value={formValues.firstName}
                                onChange={handleInputChange}
                                validations={[required]}
                            />

                            <TextField
                                margin="dense"
                                label="Last Name"
                                name="lastName"
                                type="string"
                                required
                                id="filled-basic"
                                variant="filled"
                                value={formValues.lastName}
                                onChange={handleInputChange}
                                validations={[required]}
                            />

                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                                name="email"
                                fullWidth
                                required
                                id="filled-basic"
                                variant="filled"
                                value={formValues.email}
                                onChange={handleInputChange}
                                validations={[required, email]}
                            />

                            <TextField
                                margin="dense"
                                label="Date of Birth"
                                type="date"
                                name="dateOfBirth"
                                defaultValue="2000-05-24"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                                id="filled-basic"
                                variant="filled"
                                value={formValues.dateOfBirth}
                                onChange={handleInputChange}
                                validations={[required, vDateofBirth]}
                            />

                            <TextField
                                margin="dense"
                                label="Username"
                                type="string"
                                name="userName"
                                fullWidth
                                required
                                id="filled-basic"
                                variant="filled"
                                value={formValues.userName}
                                onChange={handleInputChange}
                                validations={[required, vusername]}
                            />

                            <TextField
                                margin="dense"
                                label="Phone number"
                                type="string"
                                name="phone"
                                fullWidth
                                required
                                id="filled-basic"
                                variant="filled"
                                value={formValues.phone}
                                onChange={handleInputChange}
                                validations={[required, vPhone]}
                            />

                            <TextField
                                margin="dense"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                required
                                id="filled-basic"
                                variant="filled"
                                value={formValues.password}
                                onChange={handleInputChange}
                                validations={[required, vpassword]}
                            />

                            <TextField
                                margin="dense"
                                name="confirm_password"
                                label="Repeat Password"
                                type="password"
                                fullWidth
                                required
                                id="filled-basic"
                                variant="filled"
                                value={formValues.confirm_password}
                                onChange={handleInputChange}
                                validations={[required]}
                            />

                            <FormControl
                                margin="normal"
                                component="fieldset"
                            >
                                <RadioGroup
                                    name="gender"
                                    value={formValues.gender}
                                    onChange={handleInputChange}
                                    row
                                >
                                    <FormControlLabel
                                        key="Male"
                                        value="Male"
                                        control={<Radio size="small" />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        key="Female"
                                        value="Female"
                                        control={<Radio size="small" />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        key="Other"
                                        value="Other"
                                        control={<Radio size="small" />}
                                        label="Other"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <CheckButton
                                style={{ display: "none" }}
                                ref={checkBtn}
                            />
                        </Grid>
                        <h2 />
                        <Grid item align="center">
                            {" "}
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                REGISTER
                            </Button>
                        </Grid>
                        <Grid>
                            <h2 />
                            {message.message && (
                                <div className="form-group">
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {message.message}
                                    </div>
                                </div>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Form>
        </div>
    );
}
