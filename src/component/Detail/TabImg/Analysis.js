import React from 'react';
import CommonPage from './common_page';
import styled from "styled-components";
import '../component.css';

const Img = styled.img`
    width:50rem;
    background-repeat: no-repeat;
    background-position: center center; 
`;

export default (props) => {
   
    const setImg = () => {
        return (
            
                <Img id={"Analysis" + props.path} alt="#" src={props.imgSrc}>
                </Img>
           
        )
    }
    return (
        <CommonPage
            path={props.path}
            setImg={setImg}
            tab={"Analysis"}
        />
    )
}