import React, { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { io } from "socket.io-client";

import "./New.css";

export default function New() {
    const createGame = (gameId) => {
        console.log(`Created game with id ${gameId}`);
        window.location.href = `/online/${gameId}`;
    };

    useEffect(() => {
        const socket = io("http://192.168.1.127:3600");

        socket.on("connect", () => {
            console.log("Connected with id " + socket.id);
        });

        try {
            const playerId = localStorage.getItem("id");
            socket.emit("create-game", playerId, createGame);
        } catch (error) {
            window.location.href = `/online`;
        }
    }, []);

    return (
        <div className="loading-wheel">
            <Oval />
        </div>
    );
}
