import React, {useState } from "react";
import axios from "axios"
import "../../css/drag-drop.css"
import Question from "../../components/DragDropQuestion"
import Answer from "../../components/DragDropAnswer"
import TimerAndResult from "../../components/DragDropTimerAndResult"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import timeOutIcon from "../../images/time-out.png"
import guideIcon from "../../images/info.png"
import sadFace2 from "../../images/sad2.png"
var loaded = false;

axios.defaults.withCredentials = true;

export default function DragDrop() {
    const [questionData, setQuestionData] = useState({
        maxTime: -1,
        questions: []
    });
    const [answerData, setAnswerData] = useState([]);
    const [guideBox, setGuideBox] = useState(false);
    const [timeOut, setTimeout] = useState(false);

    // Get data from backend and shuffle the answer data once
    if (!loaded) {
        axios.get("https://tienganhcoan.herokuapp.com/quiz/drag-drop").then(response => {
            const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
            setQuestionData(response.data.questionData);
            setAnswerData(shuffle(response.data.answerData));
            loaded = true
        });
    }
    
    //Map all the questions as cards
    const questionCards = questionData.questions.map(card => {
        return (
            <Question 
                key={card.id}
                question={card.question}
                id={card.id}
                onDrop = {id => updateData(id)}
                answerData={answerData}
            />
        )
    });
    
    //Map all the answers as cards in random order
    const answerCards = answerData.map(card => {
        return (
            <Answer 
                key={card.id}
                answer={card.answer}
                id={card.id}
                matched={card.matched}
                index={answerData.findIndex((answer) => answer.answer === card.answer)}
            />
        )
    });
    
    
    
    // Update the value of the "matched" key of a specific object in the answer array
    const updateData = (id) => {
        setAnswerData(prevData => (
            prevData.map(object => {
                if (object.id === id) {
                    return {
                        ...object,
                        matched: true
                    }
                } else return object;
            })
        ))
    };

    //Check if all questions have been answered
    let count = 0;
    let finished = false;
    answerData.filter((item) => {
        if (item.matched) {
            count++;
        };
        if (count === questionData.questions.length) {
            finished = true;
        } 
    })
    
    return (
        <div className="drag-drop"
            style={{backgroundColor: (finished || timeOut) ? "#95e1d3" : "white"}}>
            <DndProvider backend={HTML5Backend}>
                <div 
                    className="questions" 
                    style={{display: (finished || timeOut) ? "none" : "", 
                            opacity: (guideBox) ? "0.2" : "1"}}>
                        <h2>Questions</h2>
                        <div className="question-box">
                            {questionCards}
                        </div>
                </div>

                <div 
                    className="answers" 
                    style={{display: (finished || timeOut) ? "none" : "", 
                            opacity: (guideBox) ? "0.2" : "1"}}>
                        <h2>Answers</h2>
                        <div className="answer-box">
                            {answerCards}
                        </div>
                </div>

                <TimerAndResult 
                    maxTime={questionData.maxTime} 
                    finished={finished}
                    displayGuide={() => setGuideBox(true)}
                    timeOut={() => setTimeout(true)}/>

                
                <div
                    className="guide pop-up"
                    style={{display: guideBox ? "" : "none"}}>
                        <img src={guideIcon} alt="guide icon" className="big-icon"/>
                        <h2 style={{color: "white"}}>H?????ng d???n</h2>
                        <p style={{color: "white"}}>
                            K??o ????p ??n v??o ????ng v??? tr?? t????ng ???ng v???i c??u h???i trong th???i gian quy ?????nh.
                        </p>
                        <button 
                            onClick={() => setGuideBox(false)} 
                            className="guide btn">????ng</button>
                </div>

                <div 
                    className="out-of-time-box pop-up" 
                    style={{display: (timeOut) ? "" : "none"}}>
                        <img 
                            className="big-icon" 
                            src={timeOutIcon} 
                            alt="out of time"/>
                        <h2>H???t gi???!</h2>
                        <img 
                            src={sadFace2} 
                            alt="sad face" 
                            className="sad dragDrop face" />
                        <button
                            className="backToQuiz"
                            onClick={() => window.location.replace("/quiz")}>
                            V??? trang Quiz
                        </button>
                        <button
                            className="again"
                            onClick={() => window.location.reload()}>
                                L??m l???i
                        </button>
                </div>
                
            </DndProvider>
        </div>
    )
}