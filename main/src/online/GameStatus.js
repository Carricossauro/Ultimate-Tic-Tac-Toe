import React, { useEffect } from "react";

import "./StatusOnline.css";

export default function GameStatus({ game, gameid }) {
    const boldStatus = () => {
        return !game["status"];
    };

    const continueGame = () => {
        window.location.href = `/online/${gameid}`;
    };

    const date = new Date(game["creation-date"]);

    return (
        <>
            <div className="creation-date">{`${date.getDate()}-${
                date.getMonth() + 1
            }-${date.getFullYear()}`}</div>
            <div className="game-status">
                {boldStatus() ? <b>Playing</b> : "Not Playing"}
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
