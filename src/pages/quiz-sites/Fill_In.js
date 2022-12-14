import React, { useEffect, useState } from "react"
import FillInQuestion from "../../components/FillInQuestion"
import Canvas from "../../components/Canvas"
import timeOutIcon from "../../images/time-out.png"
import guide from "../../images/info.png"
import happyFace from "../../images/happy.png"
import sadFace from "../../images/sad.png"
import normalFace from "../../images/normal.png"
import congrat from "../../images/congrat.png"
import muteIcon from "../../images/mute.png"
import unmuteIcon from "../../images/unmute.png"
import "../../css/fill-in.css"
import audioIntro from "../../audios/Mushroom Theme.mp3"
import pop from "../../audios/wrong.ogg"

const audio = new Audio(audioIntro);
audio.volume = 0.5;
audio.loop = true;

export default function FillIn() {
    const [speed, setSpeed] = useState(2);
    const [timeOutBox, setTimeOutBox] = useState(false);
    const [guideBox, setGuideBox] = useState(false);
    const [pauseTimer, setPauseTimer] = useState(false);
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [face, setFace] = useState(normalFace);
    const [mute, setMute] = useState(true);
    
    // Play or pause the background music when user clicks on sound button (which changes the state of "mute")
    useEffect(() => {
        if (!mute){
            audio.play();
        } else {
            audio.pause();
        }
    }, [mute]);

    // Update speed so that the character could change its move
    function updateSpeed(num) {
        const newSpeed = speed + num;
        if (newSpeed >= 0) setSpeed(newSpeed);
    }
    
    // Display the time-out pop-up
    function displayPopup() {
        setTimeOutBox(true);
    }   

    //Display the guide box, pause the countdown timer
    function displayGuide() {
        setGuideBox(true);
        setPauseTimer(true);
    }

    // Close the guide box, resume the countdown timer
    function closeGuide() {
        setGuideBox(false);
        setPauseTimer(false);
    }

    //Update character's face according to user's score
    useEffect(() => {
        if (score >= 70) setFace(happyFace);
        else if (score >= 50 && score < 70) setFace(normalFace);
        else setFace(sadFace);
    }, [score]);
    
    return (
        <div className="fill-in-container"
            style={{backgroundColor: (timeOutBox || finished) ? "#95e1d3" : "white"}}>
            <div 
                className="canvas-box" 
                style={{display: (timeOutBox || finished) ? "none" : ""}}>
                    <div className="guide-box">
                        <button 
                            className="backToQuiz fill-in" 
                            onClick={() => window.location.replace("/quiz")} >
                                V??? trang Quiz</button>
                        <button 
                            className="again fill-in" 
                            onClick={() => window.location.reload()}>
                                L??m l???i</button>
                        <img 
                            src={guide} 
                            alt="guide icon"
                            className="icon guide"
                            onClick={() => {displayGuide(); new Audio(pop).play()}}/>
                        <p>H?????ng d???n</p>
                        <br/>
                        <img 
                            src={mute ? muteIcon : unmuteIcon} 
                            alt="mute or unmute"
                            style={{width: "35px", cursor: "pointer"}}
                            onClick={() => {const newRequest = !mute; setMute(newRequest)}}/>
                        
                        <div className="fill-in-form">
                            <FillInQuestion 
                                changeSpeed={(num) => updateSpeed(num)}
                                displayPopup={() => displayPopup()}
                                finishQuiz={()=> setFinished(true)}
                                updateScore={(newScore) => setScore(newScore)}
                                pauseTimer={pauseTimer}/>
                        </div>

                    </div>

                <div 
                    className="canvas" 
                    style={{opacity: (guideBox || finished) ? "0.5" : "1"}}>
                        <Canvas 
                            speed = {speed}/>
                </div>
                
            </div>
            
            <div 
                className="out-of-time-box pop-up" 
                style={{display: (timeOutBox && score === 0) ? "" : "none"}}>
                    <img className="big-icon" src={timeOutIcon} alt="out of time"/>
                    <h2>H???t gi???!</h2>
                    <img src={sadFace} alt="sad face" className="sad face" />
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

            <div
                className="guide pop-up"
                style={{display: guideBox ? "" : "none"}}>
                    <img src={guide} alt="guide icon" className="big-icon"/>
                    <h2>H?????ng d???n</h2>
                    <p>??i???n ????p ??n ti???ng Anh v??o ?? "????p ??n" trong th???i gian quy ?????nh. 
                        <br/>
                        C??? g???ng tr??? l???i ????ng tr?????c khi b???m v??o d???u m??i t??n ho???c ???n v??o "Enter" v?? b???n s??? kh??ng th??? quay l???i c??u h???i tr?????c.
                    </p>
                    <button onClick={() => closeGuide()} className="guide btn">????ng</button>
            </div>

            <div
                className="finished pop-up"
                style={{display: (finished || (timeOutBox && score > 0)) ? "" : "none"}}
                >
                    <img 
                        src={congrat} 
                        alt="congratulation icon" 
                        className="big-icon"/>
                    <h2>Ho??n th??nh</h2>
                    <img 
                        src={face} 
                        alt="character face" 
                        className="happy face" />
                    <p>Yay! Ch??c m???ng b???n ???? ho??n th??nh b??i Quiz.
                        <br/>B???n ?????t ???????c <span className="highlight">{score}</span> / 100 ??i???m.
                    </p>
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
        </div>
    )
}