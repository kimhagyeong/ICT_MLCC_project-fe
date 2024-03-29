import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import md5 from 'md5-hash'
import api from "../../api"

const root_token = "c3cea142680c20f6dec5b853e1792a0c";

const LoginButton = styled(Button)`
    position : absolute;
    left: 10px;
    z-index: 50;
    bottom: 10px;

`

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <span>{children}</span>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

export default (props) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSettingOn = () => {
        var items = document.getElementsByClassName("admin-setting")
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = 'flex'
        }
    }

    const handleSettingOff = () => {
        var items = document.getElementsByClassName("admin-setting")
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = 'none'
        }
    }

    const handleLogout = () => {
        document.cookie = 'access=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        alert("로그아웃 되었습니다.")
        props.setLogin(false)

        handleSettingOff()
        window.location.href = '/'
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () => {
        // console.log(this.axios.defaults.headers.common['Authorization'], 'server')
        try {
            if (value === 0) {
                var _id = document.getElementById('Login-Id').value;
                var _password = document.getElementById('Login-Password').value

                var response = await api.signin({
                    id: _id,
                    password: _password
                })
                document.cookie = "access=" + response.data['token'];
                props.setLogin(true)
                setOpen(false)
                handleSettingOn()
            } else {
                var _token = document.getElementById('SignUp-Token').value

                if (md5(_token) === root_token) {

                    _id = document.getElementById('SignUp-ID').value
                    _password = document.getElementById('SignUp-Password').value
                    var _nickname = document.getElementById('SignUp-Nickname').value
                    var _name = document.getElementById('SignUp-Name').value
                    var _email = document.getElementById('SignUp-Email').value


                    await api.signup({
                        id: _id,
                        password: _password,
                        nickname: _nickname,
                        name: _name,
                        email: _email
                    })
                    setOpen(false);
                }
                else {
                    throw new Error("Token error")
                }
            }
        } catch (error) {

            if (error.message === "Token error") {
                alert(error.message)
            } else {
                console.log(error)
                alert(error)
            }

        }
    };
    return (
        <>
            {props.children}
            {props.isLogin ?
                <LoginButton variant="contained" color="primary" onClick={handleLogout}>
                    Logout
                </LoginButton> :
                <LoginButton variant="contained" color="primary" onClick={handleClickOpen}>
                    Login
                </LoginButton>
            }

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"로그인 / 회원가입"}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText> */}
                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Sign in" {...a11yProps(0)} />
                                <Tab label="Sing up" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <TextField
                                    id="Login-Id"
                                    label="ID"
                                    type="search"
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                    fullWidth />
                                <br /><br />
                                <TextField
                                    id="Login-Password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                    fullWidth
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <TextField
                                    id="SignUp-Token"
                                    label="token"
                                    type="password"
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                    fullWidth />
                                <br />
                                <TextField
                                    id="SignUp-ID"
                                    label="ID"
                                    type="search"
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                    fullWidth />
                                <br />
                                <TextField
                                    id="SignUp-Password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                    fullWidth
                                />
                                <br />
                                <TextField
                                    id="SignUp-Nickname"
                                    label="nickname"
                                    type="search"
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                    fullWidth />
                                <br />
                                <TextField
                                    id="SignUp-Name"
                                    label="name"
                                    type="search"
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                    fullWidth />
                                <br />
                                <TextField
                                    id="SignUp-Email"
                                    label="email"
                                    type="search"
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                    fullWidth />
                            </TabPanel>
                        </SwipeableViews>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        닫기
                    </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        전송
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}