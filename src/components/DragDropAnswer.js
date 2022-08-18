/**
 * I learned about Drag and Drop in React from this tutorial
 * https://react-dnd.github.io/react-dnd/docs/tutorial
 */

import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./DragDropConstants";

export default function DragDropAnswer(props) {
    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.ANSWER, //Type of draggable items
        item: {id: props.id, value: props.answer}, //Object describing the data being dragged(information available to the drop targets)
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }), //return a plain object of the props to return for injection into your component
    });

    return (
        <div 
            ref={drag}
            className="card answer" 
            id={props.id}
            style={{
                display: props.matched ? "none" : "",
                backgroundColor: isDragging ? "#95e1d3" : "#fbcc89",
                gridRow: (props.index / 5 < 5) ? (props.index / 5 + 1) : (props.index/5),
                gridColumn: props.index % 5 + 1}}>
            <div
                className="card-answer"
                style={{opacity : isDragging ? "0.5" : "1"}}>
                    {props.answer}   
            </div>
        </div>
    )
}