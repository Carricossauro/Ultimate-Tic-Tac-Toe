import React, { useState, useEffect } from "react";
import Square from "./Square";

import "./Game.css";

export default function Board({ game, small, socket, playerID }) {
    if (game["smallBoard"][small]) return <div className="board-online">X</div>;

    const playable = () => {
        return (
            game[game["playing"]] === playerID &&
            game["smallBoard"][small] === ""
        );
    };

    return (
        <div className={`board-online ${playable() ? "board-playable" : ""}`}>
            {game["bigBoard"].map(function (element, index) {
                return (
                    <Square
                        key={index}
                        game={game}
                        small={small}
                        big={index}
                        playerID={playerID}
                    />
                );
            })}
        </div>
    );
}
