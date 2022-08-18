import React, { useEffect, useState } from "react";
import Nav from '../components/Nav';
import Footer from "../components/Footer";
import "../css/quiz.css";
import character1 from "../images/happy2.png";
import character2 from "../images/happy.png";
import background from "../images/background.jpg";
import muteIcon from "../images/mute.png";
import unmuteIcon from "../images/unmute.png";
import audioIntro from "../audios/Intro Theme.mp3";

const audio = new Audio(audioIntro);
audio.volume = 0.3;
audio.loop = true;

export default function Quiz(props) {
    const [leftInstruction, setLeftInstruction] = useState(false);
    const [rightInstruction, setRightInstruction] = useState(false);
    const [mute, setMute] = useState(true);
    
    // Play or pause the background music when user clicks on sound button (which changes the "mute" state)
    useEffect(() => {
        if (!mute){
            audio.play();
        } else {
            audio.pause();
        }
    }, [mute]);

    return (
        <>
            <Nav admin={props.admin}/>

            <div 
                className="quiz" 
                style={{backgroundImage: `url(${background})`, backgroundSize: "100vw 105%"}}
                >
                    <div style={{height: "8vh"}}></div>
                    <div className="quiz-header">
                        <h2>Cùng làm quiz thôi!</h2>
                        <img 
                            src={mute ? muteIcon : unmuteIcon}
                            alt="sound" 
                            style={{width: "35px", cursor: "pointer"}}
                            onClick={() => {const newRequest = !mute; setMute(newRequest)}}/>
                    </div>

                    <div className="link quiz-links">
                        <div className="link-instruction-character">
                            <div
                                className="instruction left"
                                style={{opacity: leftInstruction ? "1" : "0", transition: "opacity 0.3s"}}>
                                    Kéo và thả đáp án sao cho đúng nghĩa với từ được cho câu hỏi.</div>
                            <div>
                                <div className="link-box" onClick={() => window.location.replace("/quiz/drag-drop")}>
                                    Drag and Drop
                                </div>
                                <div className="game-character">
                                    <img 
                                        src={character1} 
                                        alt="drag-drop game character"
                                        id="character1"
                                        onMouseOver={() => setLeftInstruction(true)}
                                        onMouseOut={() => setLeftInstruction(false)}/>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="link-instruction-character">
                            <div>
                                <div className="link-box" onClick={() => window.location.replace("/quiz/fill-in")}>
                                        Fill in Blank
                                </div>
                                <div className="game-character">
                                    <img 
                                        src={character2} 
                                        alt="fill-in game character"
                                        id="character2"
                                        onMouseOver={() => setRightInstruction(true)}
                                        onMouseOut={() => setRightInstruction(false)}/>
                                </div>
                            </div>
                            <div 
                            className="instruction right"
                            style={{opacity: rightInstruction ? "1" : "0", transition: "opacity 0.3s"}}>
                                Điền đáp án vào ô trống sao cho đúng nghĩa với từ được cho trong câu hỏi.
                            </div>
                        </div>
                    </div>

            </div>

            <Footer/>
        </>
    )
}