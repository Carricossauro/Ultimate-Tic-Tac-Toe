import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./StatusOnline.css";
import GameStatus from "./GameStatus";

export default function StatusOnline(props) {
    const [games, SetGames] = useState([]);

    useEffect(() => {
        try {
            SetGames(JSON.parse(localStorage.getItem("games")) || []);
        } catch (error) {
            SetGames([]);
        }
    }, []);

    useEffect(() => {
        console.log(games);
    }, [games]);

    return (
        <div className="online-status">
            <button className="new-game-button">Create New Game</button>
            <div className="game-list">
                <div className="game-id">Game id</div>
                <div className="creation-date">Creation Date</div>
                <div className="game-status">Status</div>
                <div className="continue-button"></div>
                {Object.keys(games).map(function (key, index) {
                    return (
                        <GameStatus
                            game={games[key]}
                            key={index}
                            gameid={key}
                        />
                    );
                })}
            </div>
        </div>
    );
}
