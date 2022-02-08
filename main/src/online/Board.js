import React from "react";
import Square from "./Square";

import "./Game.css";

export default function Board({ game, small, playerID, play }) {
    if (game["smallBoard"][small])
        return (
            <div className="board-complete">{game["smallBoard"][small]}</div>
        );

    const playable = () => {
        return (
            game[game["playing"]] === playerID &&
            game["smallBoard"][small] === "" &&
            (game["last"] == small || game["last"] == -1) &&
            !game["status"]
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
                        play={play}
                    />
                );
            })}
        </div>
    );
}
