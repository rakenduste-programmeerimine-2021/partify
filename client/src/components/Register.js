import React, { Component } from "react";
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

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword =
            this.onChangeConfirmPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);

        this.state = {
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
    }

    onChangeFirstname(e) {
        this.setState({
            firstName: e.target.value,
        });
    }
    onChangeLastname(e) {
        this.setState({
            lastName: e.target.value,
        });
    }

    onChangeUsername(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirm_password: e.target.value,
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value,
        });
    }

    onChangeDob(e) {
        this.setState({
            dateOfBirth: e.target.value,
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value,
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false,
        });

        this.form.validateAll();

        const { password, confirm_password } = this.state;
        if (password !== confirm_password) {
            this.checkBtn.context._errors.length += 1;
            return (
                <div className="alert alert-danger" role="alert">
                    The passwords must match.
                </div>
            );
        }

        if (this.checkBtn.context._errors.length === 0) {
            Auth.register(
                this.state.firstName,
                this.state.lastName,
                this.state.userName,
                this.state.email,
                this.state.password,
                this.state.confirm_password,
                this.state.dateOfBirth,
                this.state.phone,
                this.state.gender
            ).then(
                (response) => {
                    this.setState({
                        message: response.data.message,
                        successful: true,
                    });
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage,
                    });
                }
            );
        }
    }

    render() {
        return (
            <div>
                <Form
                    onSubmit={this.handleRegister}
                    ref={(c) => {
                        this.form = c;
                    }}
                >
                    <Grid>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid align={"center"}>
                                <Avatar style={avatarStyle}>
                                    <CelebrationIcon />
                                </Avatar>
                                <h2>Register to the party!</h2>

                                <TextField
                                    margin="dense"
                                    label="First Name"
                                    type="string"
                                    required
                                    id="filled-basic"
                                    variant="filled"
                                    value={this.state.firstName}
                                    onChange={this.onChangeFirstname}
                                    validations={[required]}
                                />

                                <TextField
                                    margin="dense"
                                    label="Last Name"
                                    type="string"
                                    required
                                    id="filled-basic"
                                    variant="filled"
                                    value={this.state.lastName}
                                    onChange={this.onChangeLastname}
                                    validations={[required]}
                                />

                                <TextField
                                    margin="dense"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    required
                                    id="filled-basic"
                                    variant="filled"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    validations={[required, email]}
                                />

                                <TextField
                                    margin="dense"
                                    label="Date of Birth"
                                    type="date"
                                    defaultValue="2000-05-24"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    required
                                    id="filled-basic"
                                    variant="filled"
                                    value={this.state.dateOfBirth}
                                    onChange={this.onChangeDob}
                                    validations={[
                                        required,
                                        vDateofBirth,
                                    ]}
                                />

                                <TextField
                                    margin="dense"
                                    label="Username"
                                    type="string"
                                    fullWidth
                                    required
                                    id="filled-basic"
                                    variant="filled"
                                    value={this.state.userName}
                                    onChange={this.onChangeUsername}
                                    validations={[required, vusername]}
                                />

                                <TextField
                                    margin="dense"
                                    label="Phone number"
                                    type="string"
                                    fullWidth
                                    required
                                    id="filled-basic"
                                    variant="filled"
                                    value={this.state.phone}
                                    onChange={this.onChangePhone}
                                    validations={[required, vPhone]}
                                />

                                <TextField
                                    margin="dense"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    required
                                    id="filled-basic"
                                    variant="filled"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required, vpassword]}
                                />

                                <TextField
                                    margin="dense"
                                    label="Repeat Password"
                                    type="password"
                                    fullWidth
                                    required
                                    id="filled-basic"
                                    variant="filled"
                                    value={this.state.confirm_password}
                                    onChange={
                                        this.onChangeConfirmPassword
                                    }
                                    validations={[required]}
                                />

                                <FormControl
                                    margin="normal"
                                    component="fieldset"
                                >
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            control={<Radio />}
                                            label="Female"
                                            value="Female"
                                            checked={
                                                this.state.gender ===
                                                "Female"
                                            }
                                            onChange={
                                                this.onChangeGender
                                            }
                                        />
                                        <FormControlLabel
                                            control={<Radio />}
                                            label="Male"
                                            value="Male"
                                            checked={
                                                this.state.gender ===
                                                "Male"
                                            }
                                            onChange={
                                                this.onChangeGender
                                            }
                                        />
                                        <FormControlLabel
                                            control={<Radio />}
                                            label="Other"
                                            value="Other"
                                            checked={
                                                this.state.gender ===
                                                "Other"
                                            }
                                            onChange={
                                                this.onChangeGender
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={(c) => {
                                        this.checkBtn = c;
                                    }}
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
                        </Paper>
                    </Grid>
                </Form>
            </div>
        );
    }
}
