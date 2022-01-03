import React from "react";
import "./index.css";

export default function NavBar() {
    return (
        <div className="nav-bar">
            <h3 className="title">Ultimate Tic Tac Toe</h3>
            <nav className="nav-link-grid">
                <div className="nav-link left">Home</div>
                <div className="nav-link left right">Local</div>
                <div className="nav-link right">Online</div>
            </nav>
        </div>
    );
}
