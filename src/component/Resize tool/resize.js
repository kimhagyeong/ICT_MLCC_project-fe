import React, { useState } from "react";
import { Resizable } from "re-resizable";
import Login from './login.js'

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

    return (
        <>
            <Resizable
                style={style}
                defaultSize={{
                    width: "1920px",
                    height: "1080px"
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
                <Login></Login>
            </Resizable>

        </>
    );
}