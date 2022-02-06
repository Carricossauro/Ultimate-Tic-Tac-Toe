import React, { useEffect, useState } from "react";

import "./StatusOnline.css";
import GameStatus from "./GameStatus";

export default function StatusOnline(props) {
    const [games, SetGames] = useState([]);
    const [expired, SetExpired] = useState(false);

    const gameInfo = (id) => {
        try {
            const game = JSON.parse(localStorage.getItem(id)) || [];
            console.log(game);
            return game;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    useEffect(() => {
        try {
            SetGames(JSON.parse(localStorage.getItem("games")) || []);
        } catch (error) {
            SetGames([]);
        }
    }, []);

    useEffect(() => {
        if (games.length !== 0 && !expired) {
            console.log("Inicial: [" + games + "]");
            const finalList = [];
            const today = new Date();
            for (let i = 0; i < games.length; i++) {
                const info = gameInfo(games[i]);
                if (info["expiry"] > today.getTime()) finalList.push(games[i]);
                else localStorage.removeItem(games[i]);
            }
            console.log("Final: [" + finalList + "]");
            localStorage.setItem("games", JSON.stringify(finalList));
            SetExpired(true);
            SetGames(finalList);
        }
    }, [games, expired]);

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
                {games.map((key) => {
                    return (
                        <GameStatus
                            game={gameInfo(key)}
                            key={key}
                            gameid={key}
                        />
                    );
                })}
            </div>
        </div>
    );
}
