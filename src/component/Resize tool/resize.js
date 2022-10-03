import React, { useState, useEffect } from "react";
import { Resizable } from "re-resizable";
import Login from './login.js'
import Setting from './setting'

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0",
    fontSize: "10rem"
};

export default (props) => {
    const [width, setWidth] = useState("99vw");
    const [height, setHeight] = useState("55vw");
    const [isLogin, setIsLogin] = React.useState(false);

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

    const setLogin=(value)=>{
        setIsLogin(value)
    }

    return (
        <>
            <Resizable
                style={style}
                defaultSize={{
                    width: "1910px",
                    height: "960px"
                    // width: "2550px",
                    // height: "1280px"
                }}
                // minHeight
                // minWidth
                onResize={(e, direction, ref, d) => {
                    setWidth(ref.style.width);
                    setHeight(ref.style.height);
                }}
                onResizeStop={(e, direction, ref, d) => {
                    document.getElementsByTagName('html')[0].setAttribute('style', 'font-size : ' + parseFloat(ref.style.width) / 100 + "px !important;");
                    console.log(width + "|" + height);
                }}
            >
                {props.children}
                <Login isLogin={isLogin} setLogin={setLogin}></Login>
                <Setting isLogin={isLogin} setLogin={setLogin}></Setting>
            </Resizable>

        </>
    );
}