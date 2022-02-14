import React from "react";

import "./StatusOnline.css";

export default function GameStatus({ game, gameID, playerID }) {
    const gameRunning = () => {
        return !game["status"];
    };

    const gameWinner = () => {
        if (game["winner"] === null) return "Tie";
        if (game["winner"] === playerID) return "Victory";
        return "Defeat";
    };

    const continueGame = () => {
        window.location.href = `/online/${gameID}`;
    };

    const date = new Date(game["creation-date"]);

    return (
        <>
            <div className="creation-date">{`${date.getDate()}-${
                date.getMonth() + 1
            }-${date.getFullYear()}`}</div>
            <div className="game-status">
                {gameRunning() ? <b>Playing</b> : gameWinner()}
            </div>
            <div className="continue-button">
                {gameRunning() ? (
                    <button className="button-continue" onClick={continueGame}>
                        Continue Game
                    </button>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
