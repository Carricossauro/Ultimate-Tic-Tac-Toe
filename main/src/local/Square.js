import React from "react";

export default function Square({
    smallBoard,
    bigBoard,
    playing,
    nextBoard,
    play,
    gameOver,
    tie,
    element,
    index,
    elementB,
    indexB,
}) {
    return (
        <div
            key={indexB}
            className={`board-element ${
                !gameOver &&
                !tie &&
                (nextBoard === -1 || nextBoard === index) &&
                element === "" &&
                elementB === ""
                    ? "position-playable"
                    : ""
            }`}
            onClick={() => {
                if (
                    !gameOver &&
                    !tie &&
                    (nextBoard === -1 || nextBoard === index) &&
                    element === "" &&
                    elementB === ""
                )
                    play(index, indexB);
            }}
        >
            {elementB}
        </div>
    );
}
