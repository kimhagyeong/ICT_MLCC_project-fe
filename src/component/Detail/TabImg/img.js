import React, { useEffect } from 'react';
import styled from "styled-components";
import tempImg from '../../../resource/new_align_0001.jpg'
import * as htmlToImage from 'html-to-image';


const Div = styled.div`
    width:2448px;
    height:2048px;
    background-color:red;
    position:relative;
    display:block;
    img{
        width:2448px;
        height:2048px;
    }
`;

export default (props) => {
     useEffect(() => {
        var node = document.getElementById('imgContainer');

        htmlToImage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.getElementById('resultImg').src = img.src;
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }, []);

    return(
        <>
        <img id="resultImg" style={{width:"500px"}} alt="#"></img>
        <Div id="imgContainer" >
            <img src={tempImg} alt="#"></img>
            <div style={{backgroundColor:"rgba(200, 0, 0, 0.5)",width:"109.73px",height:"214.52px",position:"absolute",left:"1195.08px",top:"855.92px"}}></div>
            <div style={{backgroundColor:"rgba(200, 0, 0, 0.5)",width:"103.54px",height:"205.72px",position:"absolute",left:"96.74px",top:"865.18px"}}></div>
            <div style={{backgroundColor:"rgba(200, 0, 0, 0.5)",width:"107.49px",height:"213.8px",position:"absolute",left:"2290.44px",top:"852.98px"}}></div>
            
        </Div>
        </>
    )
}