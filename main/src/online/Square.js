import React from "react";

import "./Game.css";

export default function Square({ game, small, big, playerID, play }) {
    const style = ["r b", "b", "l b", "r", "", "l", "r t", "t", "l t"];

    const playable = () => {
        return (
            game[game["playing"]] === playerID &&
            game["smallBoard"][small] === "" &&
            game["bigBoard"][small][big] === "" &&
            (game["last"] === small || game["last"] === -1) &&
            !game["status"]
        );
    };

    return (
        <div
            className={`square-online ${style[big]} ${
                playable() ? "playable-online" : ""
            }`}
            onClick={() => play(small, big)}
        >
            {game["bigBoard"][small][big]}
        </div>
    );
}
