import React from "react";

export default function Square({
    nextBoard,
    play,
    gameOver,
    tie,
    element,
    index,
    elementB,
    indexB,
}) {
    const playable = () => {
        if (
            !gameOver &&
            !tie &&
            (nextBoard === -1 || nextBoard === index) &&
            element === "" &&
            elementB === ""
        )
            return true;

        return false;
    };

    return (
        <div
            key={indexB}
            className={`board-element ${playable() ? "position-playable" : ""}`}
            onClick={() => {
                if (playable()) play(index, indexB);
            }}
        >
            {elementB}
        </div>
    );
}
