import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Board from "./Board";

import "./Game.css";
import Loading from "./Loading";
import GameInfo from "./GameInfo";

export default function Game({ gameID }) {
    const [game, setGame] = useState(null);
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const playerID = localStorage.getItem("id");
    const [p1, setP1] = useState(null);
    const [p2, setP2] = useState(null);

    const joinHandler = (response) => {
        if (!response) window.location.href = "/home";
        else {
            setConnected(true);
            console.log(`Connected to game room of id ${gameID}`);
        }
    };

    const gameInfoHandler = (response) => {
        setGame(response);
        socket.emit("player-info", response["pX"], setP1);
        socket.emit("player-info", response["pO"], setP2);
    };

    useEffect(() => {
        try {
            const socket_temp = io(process.env.REACT_APP_SERVER_IP);
            socket_temp.on("connect", () => {
                console.log(`Connected with id ${socket_temp.id}`);
            });

            socket_temp.emit("join", gameID, playerID, joinHandler);
            setSocket(socket_temp);
        } catch (error) {
            window.location.href = "/home";
        }
    }, [gameID]);

    useEffect(() => {
        if (connected) {
            socket.emit("game-info", gameID, gameInfoHandler);
        }
    }, [connected]);

    if (!connected || game === null) return <Loading />;

    const playing = () => {
        return game[game["playing"]] === playerID && !game["status"];
    };

    return (
        <>
            <div className="player-info">
                <h3>
                    <span className={`${playing() ? "name-playing" : "name"}`}>
                        {p1 ? p1["name"] : "???"}
                    </span>{" "}
                    <span className="name">vs</span>{" "}
                    <span className={`${!playing() ? "name-playing" : "name"}`}>
                        {p2 ? p2["name"] : "???"}
                    </span>
                </h3>
            </div>
            <div className="online-container">
                <div className="main-game">
                    {game["smallBoard"].map(function (element, index) {
                        return (
                            <Board
                                game={game}
                                small={index}
                                key={index}
                                socket={socket}
                                playerID={playerID}
                            />
                        );
                    })}
                </div>
                <GameInfo p1={p1} p2={p2} playing={playing} />
            </div>
        </>
    );
}
