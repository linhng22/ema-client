/**
 * I learned about sprite animation and Parallax in JS games from this tutorial 
 * https://www.youtube.com/watch?v=CY0HE277IBM&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&ab_channel=Frankslaboratory 
 * */ 

import React, { useEffect, useRef, useState } from "react";
import sprite from "../images/dog_sprite.png";
import background from "../images/game_background1.jpg";

const spriteWidth = 256.9;
const spriteHeight = 256.875;

const backgroundImage = new Image();
backgroundImage.src = background;

const playerImage = new Image();
playerImage.src = sprite;

let spriteAnimations = [];

// All the animation states
const animationStates = [
    {
        name: 'dead',
        frames: 10
    },
    {
        name: 'fall',
        frames: 8
    },
    {
        name: 'hurt',
        frames: 10
    },
    {
        name: 'idle',
        frames: 10
    },
    {
        name: 'jump',
        frames: 8
    },
    {
        name: 'run',
        frames: 8
    },
    {
        name: 'slide',
        frames: 10
    },
    {
        name: 'walk',
        frames: 9
    },

];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    };
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    };
    spriteAnimations[state.name] = frames;
});

export default function Canvas(props) {
    const [gameSpeed, setGameSpeed] = useState(1);
    useEffect(() => {
        setGameSpeed(props.speed);
    }, [props.speed]);

    const canvasRef = useRef(null);
    const [X, setX] = useState(0);
    const [X2, setX2] = useState(880);
    const [playerState, setPlayerState] = useState("walk");
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        const CANVAS_WIDTH = canvas.width = 880;
        const CANVAS_HEIGHT = canvas.height = 530;
        const SPRITE_CANVAS_WIDTH = 100;
        const SPRITE_CANVAS_HEIGHT = 100;
        const staggerFrames = 5;
        let gameFrame = 0;
        let x = X;
        let x2 = X2;
        
        // Set the state according to the game speed
        if (gameSpeed === 0) setPlayerState("idle");
        if (gameSpeed === 1 || gameSpeed === 2) setPlayerState("walk");
        if (gameSpeed === 3 || gameSpeed === 4) setPlayerState("run");
        if (gameSpeed === 5 || gameSpeed === 6) setPlayerState("jump");
        if (gameSpeed > 6) setPlayerState("slide");
        
        function animate() {
            ctx.drawImage(backgroundImage, x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.drawImage(backgroundImage, x2, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            if (gameSpeed >= 0) {
                if (x < -880)  x = 880 + x2 - gameSpeed;
                else x -= gameSpeed;
                if (x2 < -880) x2 = 880 + x - gameSpeed;
                else x2 -= gameSpeed;
                setX(x);
                setX2(x2);
            }
            
            let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
            let frameX = spriteWidth * position;
            let frameY = spriteAnimations[playerState].loc[position].y;
            ctx.drawImage(playerImage, frameX, frameY,
                spriteWidth, spriteHeight, 200, 350, SPRITE_CANVAS_WIDTH, SPRITE_CANVAS_HEIGHT);

            gameFrame ++;
            requestAnimationFrame(animate);
        }
        animate();
    }, [gameSpeed, playerState]);

    return (
        <>
            <canvas id="canvas1" ref={canvasRef}/>
        </>
    )
}