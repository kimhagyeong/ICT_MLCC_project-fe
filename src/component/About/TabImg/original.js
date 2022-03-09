import React from 'react';
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import BuildIcon from '@material-ui/icons/Build';

const H3 = styled.h3`
    font-size:1rem;
`;

const Img = styled.img`
    width:70rem;
    height:37rem;
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
    button:nth-child(5){
        position:absolute;
        right:0;
    }
`;
export default (props) => {
    return (
        <>
            <H3>{props.path}</H3>
            <Img alt="#" src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80"></Img>
            <Bottom>
                <IconButton aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                <IconButton aria-label="back">
                    <ArrowForwardIcon />
                </IconButton>
                <IconButton aria-label="back">
                    <ZoomInIcon />
                </IconButton>
                <IconButton aria-label="back">
                    <ZoomOutIcon />
                </IconButton>
                <IconButton aria-label="back" style={{ textAlign: "right" }} >
                    <BuildIcon/>
                </IconButton>


            </Bottom>
        </>
    )
}
