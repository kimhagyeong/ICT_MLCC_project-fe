import React, { useEffect } from 'react';
import CommonPage from './common_page';
import styled from "styled-components";
import tempImg from '../../../resource/new_align_0001.jpg'
import * as htmlToImage from 'html-to-image';
import '../component.css';

const Img = styled.img`
    width:50rem;
    background-repeat: no-repeat;
    background-position: center center; 
`;

const Container = styled.div`
    position:relative;
    display:block;
    img{
        width:2448px;
        height:2048px;
    }
    div{
        border:5px solid rgba(200, 0, 0, 0.5);
        position:absolute;
    }
`;

const Div = styled.div`
    width:70rem;
    height:35rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// const rows = [
//     {[2290.44,852.98,107.49,213.8]},

//     { id: 2, threshold: 48.000, real: 38.000, ratio: 82.609 },
//     { id: 3, threshold: 48.000, real: 38.000, ratio: 84.444 },
// ];
const bbox = [
    [
        1195.08,
        855.92,
        109.73,
        214.52
    ],
    [
        96.74,
        865.18,
        103.54,
        205.72
    ],
    [
        2290.44,
        852.98,
        107.49,
        213.8
    ],
]


export default (props) => {
    useEffect(() => {
        var node = document.getElementById('boxContainer');

        htmlToImage.toJpeg(node,{width:2448,height:2048})
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.getElementById("box" + props.path).src = img.src;
            node.remove();
            document.getElementById("boxLoader").remove();
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }, []);

    const setImg = () => {
        return (
            <>
                <Div id="boxLoader">
                    <div className="loader-div">
                        <div className="loader"></div>
                    </div>
                </Div>

                <Img id={"box" + props.path}></Img>
                <Container id="boxContainer">
                    <img src={tempImg}></img>
                    {
                        bbox.map((element) => (
                            <div style={{ width: element[2] + "px", height: element[3] + "px", left: element[0] + "px", top: element[1] + "px" }}></div>
                        ))
                    }
                </Container>
            </>
        )
    }
    return (
        <CommonPage
            path={props.path}
            setImg={setImg}
            tab={"box"}
        />
    )
}