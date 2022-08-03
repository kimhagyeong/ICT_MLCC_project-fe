import React, { useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import api from "../../api"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        width: '100%',
        height: '1.5rem',
        backgroundColor: 'white',
        justifyContent: "flex-start",
        display: 'flex',
        alignItems: "center",
        marginBottom: '10px'
    },
    p: {
        position: 'absolute',
        right: '10px'
    },
    paper1: {
        margin: '5rem 10rem 1rem 10rem',
        padding: '1.5rem',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '10px',
        height: '38rem'
    },
    paper1_1: {
        padding: '1.5rem',
        backgroundColor: '#dadada',
        borderRadius: '10px',
        height: '30rem',
        direction: "column",
        overflow: 'scroll'
    },
    paper2: {
        margin: '1rem 10rem 3rem 10rem',
        padding: '1.5rem',
        color: theme.palette.text.secondary,
        borderRadius: '10px',
        height: '4rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'left',
        position: 'relative'
    },
    h3: {
        fontSize: '1.5rem',
    },
    input: {
        position: 'absolute',
        right: '7rem',
        width: '10rem',
        marginTop: '-0.5rem'
    },
    input_btn: {
        height: '1.5rem',
        backgroundColor: 'gray',
        position: 'absolute !important',
        right: '1rem',
        width: '5rem',
        fontSize: '1rem',
    }
}));


export default (props) => {
    // useEffect 써서 access 토큰 사용해서 메인페이지로 가야하는지 판단
    const classes = useStyles();
    const [threshold, setThreshold] = React.useState(85);

    const getSettingMode = async () => {
        var access = getCookie("access")
        if (access !== null) {
            access = access.replace("access=", "")
            if (access !== null || access !== "") {
                // api 호출문 작성, 성공시 
                try {
                    var header = {
                        headers: {
                            token: access
                        }
                    }
                    var response = await api.getSettingMode(header)
                    // var response = await api.getSettingMode()
                    if (response.data === "auto") {
                        window.location.href = '/'
                    } else {
                        window.location.href = '/'
                    }
                } catch (e) {
                    console.log(e)
                    window.location.href = '/'
                }
            } else {
                window.location.href = '/'
            }
        } else {
            window.location.href = '/'
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

    const handleChange = (event) => {
        // input value 가져오기
        const { name, value } = event.target;
        switch (name) {
            case "threshold":
                if (value >= 0 && value <= 100) {
                    setThreshold(value);
                } else {
                    document.querySelector('input[name="threshold"]').value = threshold;
                }
                break;
            default:
                console.log("error!");
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper1}>
                        <h3 className={classes.h3}>처리 이미지 목록</h3>
                        <Paper className={classes.paper1_1}>
                            <Button className={classes.button}>.../.../abc.jpg <p className={classes.p}>2022.07.25 14:05:20</p></Button>
                            <Button className={classes.button}>.../.../abc.jpg <p className={classes.p}>2022.07.25 14:05:20</p></Button>
                            <Button className={classes.button}>.../.../abc.jpg <p className={classes.p}>2022.07.25 14:05:20</p></Button>
                            <Button className={classes.button}>.../.../abc.jpg <p className={classes.p}>2022.07.25 14:05:20</p></Button>
                            <Button className={classes.button}>.../.../abc.jpg <p className={classes.p}>2022.07.25 14:05:20</p></Button>
                        </Paper>
                    </Paper>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={7}>
                    <Paper className={classes.paper2}>
                        Margin threshold
                        <Input
                            className={classes.input}
                            type="number"
                            name="threshold"
                            defaultValue={threshold}
                            onChange={handleChange}
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        />
                        <Button className={classes.input_btn}>적용</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        // <>
        // <Paper className={classes.paper}>xs=12</Paper>
        // <Paper className={classes.paper}>xs=12</Paper>
        // </>
    )
}