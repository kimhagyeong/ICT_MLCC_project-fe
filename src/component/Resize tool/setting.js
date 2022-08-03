import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import md5 from 'md5-hash'
import api from "../../api"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const root_token = "c3cea142680c20f6dec5b853e1792a0c";

const SettingButton = styled(Button)`
    position : absolute;
    left: 130px;
    z-index: 50;
    bottom: 10px;

`

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        width: '100%',
    },

    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '10%'
    },
    tabPanel: {
        height: '30rem'
    },
    menuItem: {
        width: '20rem'
    }
}));

export default (props) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [isLogin, setIsLogin] = React.useState(false);
    const [settingType, setSettingType] = React.useState('auto');
    const [modeType, setModeType] = React.useState('on');

    useEffect(() => {
        if (getCookie("access") !== null) {
            if (getCookie("access") !== "access=") {
                setIsLogin(true)
                handleSettingOn()
            } else {
                handleSettingOff()
            }
        } else {
            handleSettingOff()
        }
    }, []);

    const getCookie = (name) => {
        // 변수를 선언한다.
        const cookies = document.cookie.split(";");

        // 쿠키를 추출한다.
        for (var i in cookies) {
            if (cookies[i].search(name) !== -1) {
                return cookies[i];
            }
        }
        return null;
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                setIsLogin(true)
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
                console.log(error.response.request.response)
                alert(error.response.request.response)
            }

        }
    };
    const settingTypeHandleChange = (event) => {
        setSettingType(event.target.value);
    };
    const modeTypeHandleChange = (event) => {
        setModeType(event.target.value);
    };
    return (
        <>
            {props.children}
            {isLogin ?
                <SettingButton variant="contained" color="primary" onClick={handleClickOpen}>
                    Setting
                </SettingButton> :
                null
            }

            <Dialog
                fullWidth={true}
                maxWidth={'xl'}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Settings"}</DialogTitle>
                <DialogContent>
                    <div className={classes.root}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label="일반설정" {...a11yProps(0)} />
                            <Tab label="자가학습" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel className={classes.tabPanel} value={value} index={0} >
                            <h3>모니터링 유형</h3>
                            <p> 수동촬영 장치 선택시 실시간 모니터링 기능이 정지됩니다. </p>
                            <Select
                                className={classes.menuItem}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={settingType}
                                label="settingType"
                                onChange={settingTypeHandleChange}
                            >
                                <MenuItem value={"auto"} >자동 촬영 장치</MenuItem>
                                <MenuItem value={"manual"}>수동 촬영 장치</MenuItem>
                            </Select>
                        </TabPanel>
                        <TabPanel className={classes.tabPanel} value={value} index={1} >
                            <h3>모니터링 유형</h3>
                            <p> 수동촬영 장치 선택시 실시간 모니터링 기능이 정지됩니다. </p>
                            <Select
                                className={classes.menuItem}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modeType}
                                label="modeType"
                                onChange={modeTypeHandleChange}
                            >
                                <MenuItem value={"on"} >ON</MenuItem>
                                <MenuItem value={"off"}>OFF</MenuItem>
                            </Select>
                        </TabPanel>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        닫기
                    </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        적용
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}