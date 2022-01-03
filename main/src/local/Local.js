import React from "react";
import Game from "./Game";
import Status from "./Status";

import "./Local.css";

const smallBoardEmpty = ["", "", "", "", "", "", "", "", ""];
const bigBoardEmpty = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
];

export default function Local() {
    const [bigBoard, setBigBoard] = React.useState(bigBoardEmpty); // 2 dimensions - both 3x3
    const [smallBoard, setSmallBoard] = React.useState(smallBoardEmpty); // 1 dimension - 3x3
    const [playing, setPlaying] = React.useState(true); // true - X, false - O
    const [nextBoard, setNextBoard] = React.useState(-1);
    const [gameOver, setGameOver] = React.useState(false);
    const [tie, setTie] = React.useState(false);

    // For restart button
    const restartGame = () => {
        setBigBoard(bigBoardEmpty);
        setSmallBoard(smallBoardEmpty);
        setPlaying(true);
        setNextBoard(-1);
        setGameOver(false);
    };

    // For calculating play and adding it to the game boards
    const play = (smallPosition, bigPosition) => {
        let newBigBoard = bigBoard.map((list) => [...list]);
        newBigBoard[smallPosition][bigPosition] = playing ? "X" : "O";
        setBigBoard(newBigBoard);

        // Game condition evaluation
        const board = newBigBoard[smallPosition];
        let condition = false;
        if (
            board[0] !== "" &&
            ((board[0] === board[1] && board[1] === board[2]) ||
                (board[0] === board[3] && board[3] === board[6]) ||
                (board[0] === board[4] && board[4] === board[8]))
        ) {
            condition = true;
        } else if (
            board[4] !== "" &&
            ((board[3] === board[4] && board[4] === board[5]) ||
                (board[1] === board[4] && board[4] === board[7]) ||
                (board[2] === board[4] && board[4] === board[6]))
        ) {
            condition = true;
        } else if (
            board[8] !== "" &&
            ((board[6] === board[7] && board[7] === board[8]) ||
                (board[2] === board[5] && board[5] === board[8]))
        ) {
            condition = true;
        }

        let newSmallBoard = [...smallBoard];
        if (condition) {
            newSmallBoard[smallPosition] =
                newBigBoard[smallPosition][bigPosition];
            setSmallBoard(newSmallBoard);
        } else if (newBigBoard[smallPosition].every((x) => x !== "")) {
            newSmallBoard[smallPosition] = "-";
            setSmallBoard(newSmallBoard);
        }

        setPlaying(!playing);

        if (newSmallBoard[bigPosition] === "") {
            setNextBoard(bigPosition);
        } else setNextBoard(-1);

        const over = isGameOver(newSmallBoard);
        setGameOver(over);
        if (!over) setTie(isTie(newSmallBoard));

        console.log(
            `${
                playing ? "X" : "O"
            } played (${smallPosition},${bigPosition}), GameOver: ${gameOver}`
        );
    };

    const isTie = (board) => {
        return board.every((elem) => elem !== "");
    };

    const isGameOver = (board) => {
        if (
            board[0] !== "" &&
            ((board[0] === board[1] && board[1] === board[2]) ||
                (board[0] === board[3] && board[3] === board[6]) ||
                (board[0] === board[4] && board[4] === board[8]))
        ) {
            return board[0];
        } else if (
            board[4] !== "" &&
            ((board[3] === board[4] && board[4] === board[5]) ||
                (board[1] === board[4] && board[4] === board[7]) ||
                (board[2] === board[4] && board[4] === board[6]))
        ) {
            return board[4];
        } else if (
            board[8] !== "" &&
            ((board[6] === board[7] && board[7] === board[8]) ||
                (board[2] === board[5] && board[5] === board[8]))
        ) {
            return board[8];
        }
        return false;
    };

    return (
        <div className="content">
            <Game
                smallBoard={smallBoard}
                bigBoard={bigBoard}
                playing={playing}
                nextBoard={nextBoard}
                play={play}
                gameOver={gameOver}
                tie={tie}
            />
            <Status smallBoard={smallBoard} setSmallBoard={setSmallBoard} />
        </div>
    );
}
