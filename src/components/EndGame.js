import React from "react";
import { Link } from "react-router-dom";

const EndGame = (props) => {
    return (
        <div className="endGameModal">
            <div className="info">
                <div className="gameOverMessage">You found Waldo!</div>
                <div className="timeFinished">Your Time: {props.time} seconds</div>
            </div>
            <div className="addToLeaderBoard">
                <div>Enter your name to save your time to the LeaderBoard</div>
                <form onSubmit={props.addToLeaderboard}>
                    <label for="name">Name:</label>
                    <input required autocomplete="off" type="text" name="name" id="name"></input>
                    <input type="hidden" name="time" id="time" value={props.time}></input>
                    <button className="addToLeaderBoard-button" type="submit">Add to Leaderboard</button>
                </form>
                <div className="end-game-options">
                    <Link to="/">
                        <button className="cancel-button" type="button">Return Home</button>
                    </Link>
                    <button onClick={props.restartGame} className="cancel-button" type="button">Restart</button>
                </div>
            </div>
        </div>
    )
}

export default EndGame;