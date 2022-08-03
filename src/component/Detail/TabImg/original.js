import React from 'react';
import ImgElem from "./ImgElem/index"

export default (props) => {

    return (
        <ImgElem
            path={props.path}
            img={props.img}
            cvatUrl={props.cvatUrl}
        />
    )
}
