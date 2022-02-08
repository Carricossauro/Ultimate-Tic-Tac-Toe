import React, { useEffect } from "react";
import { io } from "socket.io-client";

import "./New.css";
import Loading from "./Loading";

export default function New() {
    const createGame = (gameId) => {
        console.log(`Created game with id ${gameId}`);
        window.location.href = `/online/${gameId}`;
    };

    useEffect(() => {
        try {
            const socket = io(process.env.REACT_APP_SERVER_IP);

            socket.on("connect", () => {
                console.log("Connected with id " + socket.id);
            });

            const playerId = localStorage.getItem("id");
            socket.emit("create-game", playerId, createGame);
        } catch (error) {
            window.location.href = `/online`;
        }
    }, []);

    return <Loading />;
}
