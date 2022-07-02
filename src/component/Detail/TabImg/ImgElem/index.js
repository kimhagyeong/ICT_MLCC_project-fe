import React from 'react';
import styled from "styled-components";
import { Rect } from "react-konva";
import ImgElemContainer from "./img_elem_container"
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';

const H3 = styled.h3`
    font-size:1rem;
    text-align: right;
    padding-right: 12px;
`;

const Div = styled.div`
    width:70rem;
    height:37rem;
    overflow:hidden;
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
    button:nth-child(3){
        position:absolute;
        right:0;
    }
`;

export default (props) => {
    const rect = () => {
        if (props.bbox) {
            return (
                <>
                    {props.bbox.map((elem, key) => (
                        <Rect
                            key={key}
                            x={elem.bbox['margin_x']}
                            y={elem.bbox['margin_y']}
                            width={elem.bbox['margin_width']}
                            height={elem.bbox['margin_height']}
                            stroke={elem.b_color}
                        />)
                    )}
                </>
            )
        }
    }
    return (
        <>
            <H3>{props.path}</H3>
            <Div>
                <ImgElemContainer
                    rect={rect}
                    img={props.img}
                />
            </Div>

            <Bottom>

                <IconButton aria-label="back" style={{ textAlign: "right" }} >
                    <BuildIcon />
                </IconButton>

            </Bottom>
        </>
    )
}
