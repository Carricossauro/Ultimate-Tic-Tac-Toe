import React from "react";

import "./StatusOnline.css";

export default function GameStatus({ game, gameid }) {
    const boldStatus = () => {
        return game["status"] === "Playing";
    };

    const continueGame = () => {
        window.location.href = `/online/${gameid}`;
    };

    return (
        <>
            <div className="creation-date">{game["date"]}</div>
            <div className="game-status">
                {boldStatus() ? <b>{game["status"]}</b> : game["status"]}
            </div>
            <div className="continue-button">
                {boldStatus() ? (
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
