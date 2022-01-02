import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NavBar from "./NavBar";
import Game from "./Game";
import Status from "./Status";

ReactDOM.render(
    <main>
        <NavBar />
        <Game />
        <Status />
    </main>,
    document.getElementById("root")
);
