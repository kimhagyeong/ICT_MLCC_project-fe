import React from 'react';
import CommonPage from './common_page';
import styled from "styled-components";
import tempImg from '../../../resource/new_align_0001.jpg'


const Img = styled.img`
    width:50rem;
    // height:37rem;
    transition: transform .35s;
`;

export default (props) => {
    const setImg = () => {
        return (
            <Img id={"original" + props.path} alt="#" src={tempImg}>
            </Img>
            )
    }
    return(
        <CommonPage 
            path={props.path}
            setImg={setImg}
            tab={"original"}
            />
    )
}