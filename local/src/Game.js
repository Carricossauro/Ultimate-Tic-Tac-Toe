import React from "react";

import "./Game.css";
import "./Status.css";

export default function Game({
    smallBoard,
    setSmallBoard,
    bigBoard,
    setBigBoard,
    playing,
    setPlaying,
    nextBoard,
    setNextBoard,
    play,
    gameOver,
    tie,
}) {
    return (
        <div className="game">
            <div className="game-content">
                <h3 className="turn">
                    {tie
                        ? "It's a tie!"
                        : `${
                              gameOver
                                  ? `${gameOver} wins!`
                                  : `${playing ? "X" : "O"}'s turn`
                          }`}
                </h3>
                <div className="game-board">
                    {smallBoard.map(function (element, index) {
                        return (
                            <div
                                key={index}
                                className={`board ${
                                    !gameOver &&
                                    !tie &&
                                    (nextBoard === -1 || nextBoard === index) &&
                                    element === ""
                                        ? "available"
                                        : ""
                                }`}
                            >
                                {bigBoard[index].map(function (
                                    elementB,
                                    indexB
                                ) {
                                    return (
                                        <div
                                            key={indexB}
                                            className={`board-element ${
                                                !gameOver &&
                                                !tie &&
                                                (nextBoard === -1 ||
                                                    nextBoard === index) &&
                                                element === "" &&
                                                elementB === ""
                                                    ? "position-playable"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                if (
                                                    !gameOver &&
                                                    !tie &&
                                                    (nextBoard === -1 ||
                                                        nextBoard === index) &&
                                                    element === "" &&
                                                    elementB === ""
                                                )
                                                    play(index, indexB);
                                            }}
                                        >
                                            {elementB}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
