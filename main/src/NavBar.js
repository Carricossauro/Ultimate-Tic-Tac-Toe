import React from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faTwitter,
    faLinkedin,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

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
            <div className="social-media">
                <a
                    href="https://github.com/Carricossauro"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faGithub} className="icon" />
                </a>
                <a
                    href="https://twitter.com/charricossauro"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faTwitter} className="icon" />
                </a>
                <a
                    href="https://www.linkedin.com/in/tiagocarrico/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedin} className="icon" />
                </a>
                <a
                    href="https://www.instagram.com/carricossauro/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faInstagram} className="icon" />
                </a>
            </div>
        </div>
    );
}
