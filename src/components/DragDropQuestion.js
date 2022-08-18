import React, {useState} from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./DragDropConstants";
import correct from "../audios/correct.wav";
import wrong from "../audios/wrong.ogg";

export default function DragDropQuestion(props) {
    const [box, setBox] = useState({
        answer: "",
        matched : false
    });

    const [newAnswerData, setNewAnswerData] = useState(props.answerData);

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.ANSWER, //Type of data items the drop-target accepts
        drop: (item) => check(item), //Gets the drag source and calls the check() function
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }) 
    })
    
    // Check if the id of the draggable item matches the id of the drop target
    function check(input){
        if (input.id === props.id) {
            setBox({answer: input.value, matched: true});
            const answerList = newAnswerData.filter((item) => input.id === parseInt(item.id));
            //Pass the id of the first object to the function
            //We need to pass 1 ID because each question has only one correct answer
            props.onDrop(answerList[0].id);
            new Audio(correct).play();
        } else {
            new Audio(wrong).play();
        }
    }
    
    return (
        <div id={props.id}
            className="card question">
            <div className="card-question">{props.question}</div>

            <div 
                className="card-droppable" 
                ref={drop}
                style={{opacity: isOver ? "0.5" : "1",
                        background: box.matched ? "#95e1d3" : "",
                        fontSize: box.matched ? "16px" : "13px"}}>
                    {box.answer ? box.answer : "Kéo vào đây"}
            </div>
        </div>
    )
}