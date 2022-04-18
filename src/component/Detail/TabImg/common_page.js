import React from 'react';
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import BuildIcon from '@material-ui/icons/Build';

const H3 = styled.h3`
    font-size:1rem;
    text-align: right;
    padding-right: 12px;
`;

const Div = styled.div`
    width:70rem;
    height:37rem;
    overflow:scroll;
    margin:auto;
    position:relative;
`;
const Bottom = styled.div`
    width: 100%;
    height:5rem;
    display:flex;
    position:relative;
    padding-top: 1rem;

    button{
        margin-left:1.5rem;
        margin-right:1.5rem;
        svg{
            font-size:2rem;
        }
        height:3.3rem;
    }
    // button:nth-child(7){
    //     position:absolute;
    //     right:0;
    // }
    button:nth-child(3){
        position:absolute;
        right:0;
    }
`;
export default (props) => {
    // const [scale, setScale] = React.useState(1);
    // const [screenX, setScreenX] = React.useState(0);
    // const [screenY, setScreenY] = React.useState(0);

    // const handleLeft = () => {
    //     if (scale > 1 || screenX !== 0) {
    //         var _screenX = screenX + 1
    //         setScreenX(_screenX);
    //         document.getElementById(props.tab + props.path).setAttribute('style', 'transform:translateX(' + _screenX + 'rem) scale(' + scale + ') translateY(' + screenY + 'rem);');
    //     }
    // }
    // const handleRight = () => {
    //     if (scale > 1 || screenX !== 0) {
    //         var _screenX = screenX - 1
    //         setScreenX(_screenX);
    //         document.getElementById(props.tab + props.path).setAttribute('style', 'transform:translateX(' + _screenX + 'rem) scale(' + scale + ') translateY(' + screenY + 'rem);');
    //     }
    // }
    // const handleUp = () => {
    //     if (scale > 1 || screenY !== 0) {
    //         var _screenY = screenY + 1
    //         setScreenY(_screenY);
    //         document.getElementById(props.tab + props.path).setAttribute('style', 'transform:translateX(' + screenX + 'rem) scale(' + scale + ') translateY(' + _screenY + 'rem);');
    //     }
    // }
    // const handleDown = () => {
    //     if (scale > 1 || screenY !== 0) {
    //         var _screenY = screenY - 1
    //         setScreenY(_screenY);
    //         document.getElementById(props.tab + props.path).setAttribute('style', 'transform:translateX(' + screenX + 'rem) scale(' + scale + ') translateY(' + _screenY + 'rem);');
    //     }
    // }
    // const handleZoomIn = () => {
    //     var _scale = scale + 0.5
    //     setScale(_scale);
    //     document.getElementById(props.tab + props.path).setAttribute('style', 'transform:translateX(' + screenX + 'rem) scale(' + _scale + ') translateY(' + screenY + 'rem);');
    // }
    // const handleZoomOut = () => {
    //     if (scale > 1) {
    //         var _scale = scale - 0.5
    //         setScale(_scale);
    //         document.getElementById(props.tab+ props.path).setAttribute('style', 'transform:translateX(' + screenX + 'rem) scale(' + _scale + ') translateY(' + screenY + 'rem);');
    //     }
    // }

    const [scale, setScale] = React.useState(50);

    const handleZoomIn = () => {
        var _scale = scale + 3
        setScale(_scale);
        document.getElementById(props.tab + props.path).setAttribute('style', 'width:' + _scale + 'rem;')
    }
    const handleZoomOut = () => {
        var _scale = scale - 3
        setScale(_scale);
        document.getElementById(props.tab + props.path).setAttribute('style', 'width:' + _scale + 'rem;')

    }

    return (
        <>
            <H3>{props.path}</H3>
            <Div>{props.setImg()}</Div>

            <Bottom>
                {/* <IconButton aria-label="back" onClick={handleLeft}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton aria-label="back" onClick={handleRight}>
                    <ArrowForwardIcon />
                </IconButton>
                <IconButton aria-label="back" onClick={handleUp}>
                    <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="back" onClick={handleDown}>
                    <ArrowDownwardIcon />
                </IconButton> */}
                <IconButton aria-label="back" onClick={handleZoomIn}>
                    <ZoomInIcon />
                </IconButton>
                <IconButton aria-label="back" onClick={handleZoomOut}>
                    <ZoomOutIcon />
                </IconButton>
                <IconButton aria-label="back" style={{ textAlign: "right" }} >
                    <BuildIcon />
                </IconButton>


            </Bottom>
        </>
    )
}
