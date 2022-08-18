import React, { useEffect, useState } from "react";

var questionList = [];
var answerList = [];

export default function CreateTestFormContent(props) {
    const [questionArray, setquestionArray] = useState({
        id: 0,
        question: ""
    });
    const [answerArray, setAnswerArray] = useState({
        id: 0,
        matched: false
    });

    // Add new questions to the question list
    function addQuestion(e) {
        if (e.target.value){
            e.target.style.backgroundColor="#cffcf4";
            e.target.style.outline="none";
            const {id, name, value} = e.target;
            setquestionArray(prevArray => ({
                ...prevArray,
                id: parseInt(id.substring(name.length)),
                [name] : value
            }));
        } else{
            e.target.style.backgroundColor="#fff";
            e.target.style.outline="1px solid #bbb";
        }        
    }

    // Add new answers to the answer list
    function addAnswer(e) {
        if (e.target.value) {
            e.target.style.backgroundColor="#cffcf4";
            e.target.style.outline="none";
            const {id, name, value} = e.target;
            setAnswerArray(prevArray => ({
                ...prevArray,
                id: parseInt(id.substring(name.length)),
                [name] : value
            }));
        } else{
            e.target.style.backgroundColor="#fff";
            e.target.style.outline="1px solid #bbb";
        }
    }

    // Change background color of a row when user is inputting
    function addBackground(e){
        const currentElement = document.getElementById(e.target.id);
        const parent = currentElement.parentElement.parentElement;
        parent.style.backgroundColor="#95e1d3";
        parent.style.transition="background-color 0.5s"
    }

    // Remove background color of a row when user is not inputting
    function removeBackground(e){
        const currentElement = document.getElementById(e.target.id);
        const parent = currentElement.parentElement.parentElement;
        parent.style.backgroundColor="#fff";
        parent.style.transition="background-color 0.5s";
    }
    
    // Update the question list
    useEffect(() => {
        if (questionArray.id > 0) {
            questionList[questionArray.id - 1] = questionArray;
        }
    }, [questionArray]);

    // Update the answer list
    useEffect(() => {
        if (answerArray.id > 0) {
            answerList[answerArray.id - 1] = answerArray;
        }
    }, [answerArray]);

    // Pass question list and answer list to the parent component
    props.updateData({questionList, answerList});
    
    return (
        <div className="form-content-box">
            <div className="form-content">
                <p>{props.id}</p>
                <input 
                    type="text"
                    minLength={1}
                    className="question input"
                    autoComplete="off"
                    onChange={addQuestion}
                    onFocus={addBackground}
                    onBlur={removeBackground}
                    name="question"
                    id={`question${props.id}`}
                    required/>
            
                <input 
                    type="text"
                    minLength={1}
                    className="answer input"
                    autoComplete="off"
                    onChange={addAnswer}
                    onFocus={addBackground}
                    onBlur={removeBackground}
                    name="answer"
                    id={`answer${props.id}`}
                    placeholder="Chỉ điền MỘT đáp án duy nhất!"
                    required/>
            </div>
        </div>
    )
}