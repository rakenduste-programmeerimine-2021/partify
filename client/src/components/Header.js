import React, { useState, useRef, useEffect } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Tab,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { Component } from "react";
import Auth from "../services/Auth";
import Profile from "./Profile";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
const appStyle = { backgroundColor: "rgb(68 122 48)" };
const typoStyle = { cursor: "pointer" };

export default function Header() {
    const [currentUser, setCurrentUser] = useState(false);
    const user = Auth.getCurrentUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (
          user === null ||
          user === undefined ||
            !user
        ) {
            setCurrentUser(false);
        } else {
            setCurrentUser(true);
        }
    });

    const logOut = (e) => {
        e.preventDefault();
        Auth.logout();
        return navigate("/login");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={appStyle}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    ></IconButton>
                    <Typography
                        style={typoStyle}
                        variant="h6"
                        component={NavLink}
                        to="/"
                        sx={{ flexGrow: 1 }}
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
                        PARTIFY
                    </Typography>

                    {currentUser ? (
                        <div>
                            <Tab
                                icon={<PersonIcon />}
                                aria-label="person"
                                component={NavLink}
                                to="/profile"
                            />
                            <Tab
                                icon={<SettingsIcon />}
                                aria-label="settings"
                                component={NavLink}
                                to="/settings"
                            />
                            <Tab
                                icon={<AddIcon />}
                                aria-label="add"
                                component={NavLink}
                                to="/addpost"
                            />
                            <Tab
                                icon={<HomeRoundedIcon />}
                                aria-label="person"
                                component={NavLink}
                                to="/viewpost"
                            />
                            <Tab
                                onClick={logOut}
                                component={NavLink}
                                to="/login"
                                icon={<LogoutIcon />}
                            />
                        </div>
                    ) : (
                        <div>
                            <Tab
                                icon={<LoginIcon />}
                                aria-label="login"
                                component={NavLink}
                                to="/login"
                            />
                            <Tab
                                icon={<PersonPinIcon />}
                                aria-label="register"
                                component={NavLink}
                                to="/register"
                            />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
