import React, {useEffect} from "react";
import "../styles/game.css";


const Timer = (props) => {

    useEffect(() => {
        let interval = null;
        if (!props.stopGame) {
            interval = setInterval(() => {
                props.setTime(prevTime => prevTime + 1) 
            }, 1000)
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [props.stopGame])
    return (
        <div className="timer">
            <div>{("0" + Math.floor((props.time / 60) % 60)).slice(-2)}:</div>
            <div>{("0" + Math.floor(props.time % 60)).slice(-2)}</div>
        </div>
    )
}

export default Timer;