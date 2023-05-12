import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import leaderBoardIcon from "../icons/leaderboard.svg";
import homeIcon from "../icons/home.svg";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <h1 className="logo"><span>WHERE'S</span> <span>WALDO?</span></h1>
            </Link>
            <div className="nav-bar">
                <ul>
                    <Link to="/">
                        <li><img className="home-icon" alt="Home"src={homeIcon}></img></li>
                    </Link>
                    <Link to="/leaderboard">
                        <li><img className="leaderboard-icon" alt="Leaderboard" src={leaderBoardIcon}></img></li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Header;