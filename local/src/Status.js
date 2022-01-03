import React from "react";

import "./Status.css";

export default function Status({ smallBoard, setSmallBoard }) {
    return (
        <div className="status">
            <h3 className="status-title">Game Result</h3>
            <div className="board">
                {smallBoard.map(function (element, index) {
                    return (
                        <div key={index} className="board-element">
                            {element}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
