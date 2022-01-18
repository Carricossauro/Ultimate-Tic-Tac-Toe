import React from "react";

import "./Game.css";
import "./Status.css";

import Board from "./Board";

export default function Game(props) {
    const turn = () => {
        if (gameOver) return `${gameOver} wins!`;

        return `${playing ? "X" : "O"}'s turn`;
    };

    const { smallBoard, playing, gameOver, tie } = props;
    return (
        <div className="game-content">
            <h3 className="turn">{tie ? "It's a tie!" : turn()}</h3>
            <div className="game-board">
                {smallBoard.map(function (element, index) {
                    return (
                        <Board
                            {...props}
                            key={index}
                            element={element}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}
