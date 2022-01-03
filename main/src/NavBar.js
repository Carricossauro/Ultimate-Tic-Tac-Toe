import React from "react";
import "./NavBar.css";

export default function NavBar() {
    return (
        <div className="nav-bar">
            <h3 className="title">Ultimate Tic Tac Toe</h3>
            <nav className="nav-link-grid">
                <a className="nav-link left" href="/">
                    Home
                </a>
                <a className="nav-link left right" href="/local">
                    Local
                </a>
                <a className="nav-link right" href="/online">
                    Online
                </a>
            </nav>
        </div>
    );
}
