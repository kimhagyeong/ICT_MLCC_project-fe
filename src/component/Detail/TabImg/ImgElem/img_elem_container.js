import React from "react";
import { Stage, Layer } from "react-konva";
import ImgElem from "./img_elem"
import Img from "../../../../resource/new_align_0001.jpg"


class ImgElemContainer extends React.Component {
    state = {
        stageScale: 0.5,
        stageX: 0,
        stageY: 0
    };
    handleWheel = (e) => {
        e.evt.preventDefault();

        const scaleBy = 1.05;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });

        this.setState({
            stageScale: newScale,
            stageX:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            stageY:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        });
    };

    img() {
        return (Img)
    }
    render() {
        return (
            <Stage
                width={1344}
                height={710.4}
                onWheel={this.handleWheel}
                scaleX={this.state.stageScale}
                scaleY={this.state.stageScale}
                x={50}
                y={-100}
            >
                <Layer
                    draggable
                    onDragStart={() => {
                        this.setState({
                            isDragging: true
                        });
                    }}
                    onDragEnd={(e) => {
                        this.setState({
                            isDragging: false,
                            x: e.target.x(),
                            y: e.target.y()
                        });
                    }}
                >
                    <ImgElem
                        src={this.props.img}
                        x={0}
                        y={0}
                    />
                    {
                        this.props.rect()
                    }
                </Layer>
            </Stage>
        );
    }
}
export default ImgElemContainer;