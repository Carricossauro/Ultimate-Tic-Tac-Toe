import React from "react";
import { useParams } from "react-router-dom";

import "./Online.css";
import StatusOnline from "./StatusOnline";
import New from "./New";
import Setup from "./Setup";
import Game from "./Game";

export default function Online(props) {
    const { gameId } = useParams();

    if (localStorage.getItem("id") == null) return <Setup gameId={gameId} />;
    else if (gameId === "status") return <StatusOnline />;
    else if (gameId === "new") return <New />;
    else return <Game gameID={gameId} />;
}
