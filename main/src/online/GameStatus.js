import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./StatusOnline.css";

export default function GameStatus({ game, gameid }) {
    const boldStatus = () => {
        return game["status"] == "Playing";
    };

    return (
        <>
            <div className="game-id">{gameid}</div>
            <div className="creation-date">{game["date"]}</div>
            <div className="game-status">
                {boldStatus() ? <b>{game["status"]}</b> : game["status"]}
            </div>
            <div className="continue-button">
                {boldStatus() ? (
                    <button
                        className="button-continue"
                        onClick={() =>
                            (window.location.href = `/online/${gameid}`)
                        }
                    >
                        Continue Game
                    </button>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
