import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "./StatusOnline.css";
import GameStatus from "./GameStatus";

export default function StatusOnline(props) {
    const [games, setGames] = useState([]);
    const [playerID, setPlayerID] = useState(() => {
        try {
            return localStorage.getItem("id") || null;
        } catch (error) {
            return null;
        }
    });

    useEffect(() => {
        try {
            const socket = io(process.env.REACT_APP_SERVER_IP);
            socket.on("connect", () => {
                console.log(`Connected with id ${socket.id}`);
            });

            socket.emit("game-list", playerID, setGames);
        } catch (error) {
            window.location.href = "/home";
        }
    }, [playerID]);

    return (
        <div className="online-status">
            <button
                className="new-game-button"
                onClick={() => (window.location.href = "/online/new")}
            >
                Create New Game
            </button>
            <div className="game-list">
                <div className="creation-date">Creation Date</div>
                <div className="game-status">Status</div>
                <div className="continue-button"></div>
                {games.map((game) => {
                    return (
                        <GameStatus
                            game={game}
                            key={game["_id"]}
                            gameid={game["_id"]}
                        />
                    );
                })}
            </div>
        </div>
    );
}
