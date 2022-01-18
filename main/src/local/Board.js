import React from "react";

import Square from "./Square";

export default function Board(props) {
    const { bigBoard, nextBoard, gameOver, tie, element, index } = props;

    const available = () => {
        if (
            !gameOver &&
            !tie &&
            (nextBoard === -1 || nextBoard === index) &&
            element === ""
        )
            return "available";

        return "";
    };

    return (
        <div key={index} className={`board ${available()}`}>
            {bigBoard[index].map(function (elementB, indexB) {
                return (
                    <Square
                        {...props}
                        key={indexB}
                        elementB={elementB}
                        indexB={indexB}
                    />
                );
            })}
        </div>
    );
}
