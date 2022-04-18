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
        // var canvas = document.getElementById("canvas1");
        // if (canvas.getContext) {
        //     var ctx = canvas.getContext("2d");

        //     ctx.fillStyle = "rgb(200,0,0)";
        //     //  "bbox": [
        //     //     1195.08,
        //     //     855.92,
        //     //     109.73,
        //     //     214.52
        //     // ],

        //     //"bbox": [
        //     //     96.74,
        //     //     865.18,
        //     //     103.54,
        //     //     205.72
        //     // ],

        //     //"bbox": [
        //     //     2290.44,
        //     //     852.98,
        //     //     107.49,
        //     //     213.8
        //     // ],

        //     ctx.fillRect(
        //         "1140.215px",
        //         748.66,
        //         10.973,
        //         21.452);

        //     ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        //     ctx.fillRect(10, 10, 50, 50);
        // }

        // html2canvas(document.getElementById("imgContainer"))
        // //id container 부분만 스크린샷
        // .then(function (canvas) {
        // //jpg 결과값
        // drawImg(canvas.toDataURL('image/jpeg'));
        // }).catch(function (err) {
        // console.log(err);
        // });

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

    function drawImg(imgData) {
        console.log(imgData);
        //imgData의 결과값을 console 로그롤 보실 수 있습니다.
        return new Promise(function reslove() {
        //내가 결과 값을 그릴 canvas 부분 설정
        var canvas = document.getElementById('canvas1');
        var ctx = canvas.getContext('2d');
        //canvas의 뿌려진 부분 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        var imageObj = new Image();
        imageObj.onload = function () {
        ctx.drawImage(imageObj, 10, 10);
        //canvas img를 그리겠다.
        };
        imageObj.src = imgData;
        //그릴 image데이터를 넣어준다.
        
        }, function reject() { });
        
        }
        
        
    return(
        <>
        {/* <Canvas id="canvas1"></Canvas> */}
        <img id="resultImg" style={{width:"500px"}}></img>
        <Div id="imgContainer" >
            <img src={tempImg}></img>
            <div style={{backgroundColor:"rgba(200, 0, 0, 0.5)",width:"109.73px",height:"214.52px",position:"absolute",left:"1195.08px",top:"855.92px"}}></div>
            <div style={{backgroundColor:"rgba(200, 0, 0, 0.5)",width:"103.54px",height:"205.72px",position:"absolute",left:"96.74px",top:"865.18px"}}></div>
            <div style={{backgroundColor:"rgba(200, 0, 0, 0.5)",width:"107.49px",height:"213.8px",position:"absolute",left:"2290.44px",top:"852.98px"}}></div>
            
        </Div>
        </>
    )
}