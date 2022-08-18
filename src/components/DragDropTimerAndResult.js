import React, { useState, useEffect } from "react"
import guide from "../images/info.png"
import happyFace2 from "../images/happy2.png"
import sadFace2 from "../images/sad2.png"
import normalFace2 from "../images/normal2.png"
import congrat from "../images/congrat.png"
import muteIcon from "../images/mute.png"
import unmuteIcon from "../images/unmute.png"
import backgroundAudio from "../audios/Iceland Theme.mp3"
import pop from "../audios/wrong.ogg"
import complete from "../audios/complete.wav"

const audio = new Audio(backgroundAudio);
audio.volume = 0.2;
audio.loop = true; // Make the audio autoplay

export default function Timer(props) {
    const [time, setTime] = useState(props.maxTime);
    const [timerOn, setTimerOn] = useState(true);
    const [score, setScore] = useState(0);
    const [face, setFace] = useState(normalFace2);
    const [mute, setMute] = useState(true);
    
    // Play or pause the music when user clicks on sound button
    useEffect(() => {
        if (!mute){
            audio.play();
        } else {
            audio.pause();
        }
    }, [mute]);

    // Update the max time after getting data from backend
    useEffect(() => {
        setTime(props.maxTime)
    }, [props.maxTime]);

    // Count down time
    if (time > 0 && timerOn) {
        setTimeout(() => setTime(time - 1), 1000);
    }

    // Update character face, text that shows time has run out, and set timerOn as false
    useEffect(() => {
        if (time === 0) {
            setTimerOn(false);
            setFace(sadFace2);
            props.timeOut();
        }
    }, [time]);
    
        
    // Evaluate grade based on the actual time doing quiz and the total given time
    useEffect(() => {
        if (props.finished) {
            setTimerOn(false);
            setScore(((time/props.maxTime) * 100).toFixed(2));
            new Audio(complete).play();
        }
    }, [props.finished]);

    // Update the character's face according to the user's score
    useEffect(() => {
        if (score >= 80) {
            setFace(happyFace2);
        } else if (score >= 50 && time/props.maxTime < 80) {
            setFace(normalFace2);
        } else {
            setFace(sadFace2);
        }
    }, [score]);

    return (
        <>
            <div className="guide-box"
                style={{opacity: (timerOn) ? "1" : "0"}}>
                <img 
                    src={guide} 
                    alt="guide icon"
                    className="icon guide"
                    onClick={() => {
                        // Display the guide box and play the sound effect
                        props.displayGuide(); 
                        new Audio(pop).play()}}/>
                <p>Hướng dẫn</p>
                <button className="backToQuiz" onClick={() => window.location.replace("/quiz")} >Về trang Quiz</button>
                <button className="again" onClick={() => window.location.reload()}>Làm lại</button>
            </div>

            <div className="timer"
                style={{opacity: (timerOn) ? "1" : "0"}}>
                Thời gian: 
                <span className="highlight"> {time >= 0 ? time : "..."}</span> giây
                <div 
                    className="progress-bar" 
                    style={{width: `${(time / props.maxTime) * 98}%`}}>
                </div>
                <br/>
                <div>
                    <img 
                        src={mute ? muteIcon : unmuteIcon} 
                        alt="mute or unmute"
                        style={{width: "35px", cursor: "pointer"}}
                        onClick={() => {
                            // Mute or unmute the background music when user clicks on the sound button
                            const newRequest = !mute; 
                            setMute(newRequest)}}/>
                </div>                
            </div>

            <div
                className="results pop-up"
                style={{display: (props.finished) ? "" : "none"}}
                >
                    <img src={congrat} alt="congratulation icon" className="big-icon"/>
                    <h2>Hoàn thành</h2>
                    <img 
                        src={face} 
                        alt="character face" 
                        className="happy face" />
                    <p>Yay! Chúc mừng bạn đã hoàn thành bài Quiz.
                        <br/>Bạn đạt được <span className="highlight">{score}</span> / 100 điểm.
                    </p>
                    <button
                        className="backToQuiz"
                        onClick={() => window.location.replace("/quiz")}>
                            Về trang Quiz
                    </button>
                    <button
                        className="again"
                        onClick={() => window.location.reload()}>
                            Làm lại
                    </button>
            </div>

        </>
        
    )
}