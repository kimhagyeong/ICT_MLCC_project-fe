import React from 'react';
import ImgElem from "./ImgElem/index"

export default (props) => {

    return (
        <ImgElem
            path={props.path}
            img={props.img}
            bbox={props.bbox}
        ></ImgElem>
    )
}
