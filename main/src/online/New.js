import React, { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { io } from "socket.io-client";

import "./New.css";

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

export default function New() {
    const createGame = (gameId) => {
        console.log(`Created game with id ${gameId}`);

        const today = new Date();

        const gameInfo = {
            date: `${today.getFullYear()}-${
                today.getMonth() + 1
            }-${today.getDate()}`,
            player: "X",
            status: "Playing",
            bigBoard: bigBoardEmpty,
            smallBoard: smallBoardEmpty,
            expiry: today.getTime() + 2592000000,
        };

        localStorage.setItem(gameId, JSON.stringify(gameInfo));

        try {
            const games = JSON.parse(localStorage.getItem("games")) || [];
            games.push(gameId);
            localStorage.setItem("games", JSON.stringify(games));
        } catch (error) {
            window.location.href = `/online`;
        }

        window.location.href = `/online/${gameId}`;
    };

    useEffect(() => {
        const socket = io("http://192.168.1.127:3600");

        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.emit("create", createGame);
    }, []);

    return (
        <div className="loading-wheel">
            <Oval />
        </div>
    );
}
