import React, { useEffect, useState } from "react";
import "../styles/game.css";
import Level1 from "../images/cropped.jpg";
import Timer from "./Timer";
import EndGame from "./EndGame";
import { collection, addDoc, getDocs } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";

const Game = (props) => {
    const [stopGame, setStopGame] = useState(false);
    const [time, setTime] = useState(0);
    const [waldoCoords, setWaldoCoords] = useState();
    const navigate = useNavigate();

    const handleClick = (e) => {
        let x = (e.nativeEvent.offsetX / e.target.clientWidth).toFixed(2);
        let y = (e.nativeEvent.offsetY / e.target.clientHeight).toFixed(2);
        let selectedCoords = `${x}, ${y}`;
        checkAnswer(selectedCoords);
    }

    const checkAnswer = async (selectedCoords) => {    
        if (waldoCoords.includes(selectedCoords)) {
            setStopGame(true);
        } else {
            console.log("No");
        }
    }

    const addToLeaderboard = async (e) => {
        e.preventDefault();
        if (e.target.elements.name.value === "") {
            props.setShowAlert(true);
            props.setAlertMessage("Failed to add. Name is required");
            navigate("/");
        } else {
            await addDoc(collection(props.db, "leaderboard"), {
                name: e.target.elements.name.value,
                time: parseInt(e.target.elements.time.value),
            });
            props.setShowAlert(true);
            props.setAlertMessage("Added to Leaderboard!");
            navigate("/");
        }
    }

    const restartGame = () => {
        setStopGame(false);
        setTime(0);
    }

    useEffect(() => {
        const getData = async () => {
            const waldoCol = collection(props.db, "waldo");
            const waldoSnapshot = await getDocs(waldoCol);
            const waldo = waldoSnapshot.docs.map(doc => doc.data());
            setWaldoCoords(waldo[0]["x-coord"]);
          }
          getData();
    }, [props.db]);

    return (
        <>
        <div className="game-container">
            <Timer time={time} setTime={setTime} stopGame={stopGame}/>
            <div className="image-container">
                <img onClick={handleClick} alt="Game"src={Level1} className="game-image"></img>
            </div>
        </div>
        {stopGame && (
            <EndGame restartGame={restartGame} addToLeaderboard={addToLeaderboard} time={time}/>
        )}
        </>
    )
}

export default Game;