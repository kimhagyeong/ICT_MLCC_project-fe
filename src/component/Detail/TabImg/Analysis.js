import React from 'react';
import ImgElem from "./ImgElem/index"

const bbox = [
    [
        1195.08,
        855.92,
        109.73,
        214.52,
        "red"
    ],
    [
        96.74,
        865.18,
        103.54,
        205.72,
        "red"
    ],
    [
        2290.44,
        852.98,
        107.49,
        213.8,
        "red"
    ],
]

export default (props) => {

    return (
        <ImgElem
            path={props.path}
            bbox={bbox}
        ></ImgElem>
    )
}
