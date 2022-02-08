import React, { useState, useEffect } from "react";

import "./Game.css";

export default function Square({ game, small, big, socket, playerID }) {
    const style = ["r b", "b", "l b", "r", "", "l", "r t", "t", "l t"];

    const playable = () => {
        return (
            game[game["playing"]] === playerID &&
            game["smallBoard"][small] === "" &&
            game["bigBoard"][small][big] === "" &&
            !game["status"]
        );
    };

    return (
        <div
            className={`square-online ${style[big]} ${
                playable() ? "playable-online" : ""
            }`}
        >
            {game["bigBoard"][small][big]}
        </div>
    );
}
