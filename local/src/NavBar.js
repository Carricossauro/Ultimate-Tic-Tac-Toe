import React from "react";
import "./index.css";

export default function NavBar() {
    return (
        <div class="nav-bar">
            <h3 class="title">Ultimate Tic Tac Toe</h3>
            <nav class="nav-link-grid">
                <div class="nav-link left">Home</div>
                <div class="nav-link left right">Local</div>
                <div class="nav-link right">Online</div>
            </nav>
        </div>
    );
}
