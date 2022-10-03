import React,{useEffect} from "react";
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import api from "../../api";


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
    const [settingType, setSettingType] = React.useState('auto');
    const [modeType, setModeType] = React.useState('on');

    const getSettingMode = async () => {
        var access = getCookie("access")
        if (access !== null) {
            access = access.replace("access=", "")
            if (access !== null || access !== "") {
                // api 호출문 작성, 성공시 
                try {
                    var response = await api.getSettingMode(access)
                    
                    setSettingType(response.data.mode)
                } catch (e) {
                    console.log(e)
                    alert("로그인을 확인해주세요")
                    setOpen(false)
                }
            }
        }
    }

    useEffect(() => {
        getSettingMode()
        return () => {
            getSettingMode()
        };
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

    const handleClose = () => {
        setOpen(false);
    };
    
    const settingTypeHandleChange = (event) => {
        setSettingType(event.target.value);
    };

    const modeTypeHandleChange = (event) => {
        setModeType(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            if (value === 0) {
                // var _mode = document.getElementById('mode-select').value;

                // var response = await api.signin({
                //     id: _id,
                //     password: _password
                // })
                // document.cookie = "access=" + response.data['token'];
                // props.setLogin(true)
                // setOpen(false)
                // handleSettingOn()
                await api.settingMode(getCookie("access").replace("access=", ""), settingType)
                alert(settingType+"모드로 세팅되었습니다.")
                
                if(settingType==='auto'){
                    window.location.href = '/'
                }else{
                    window.location.href = '/manual'
                }
            } else {
                await api.learningMode(getCookie("access").replace("access=", ""),modeType)
                alert(modeType+"모드로 세팅되었습니다.")
                setOpen(false)
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
                                id="mode-select"
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
                                id="learning-mode"
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