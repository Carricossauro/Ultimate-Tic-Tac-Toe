import React from "react";

import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <section className="welcome-section">
                <h3>Welcome to the Ultimate Tic Tac Toe Website!</h3>
                <p>
                    If you want to learn how to play the game,{" "}
                    <a
                        className="link"
                        href="https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        click here.
                    </a>
                </p>
                <p>
                    Check out the source code for this project{" "}
                    <a
                        className="link"
                        href="https://github.com/Carricossauro/Ultimate-Tic-Tac-Toe"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        here
                    </a>
                    .
                </p>
            </section>
            <section className="play-section">
                <div className="play-local-online">
                    <h3>Play with a friend on your computer</h3>
                    <button
                        className="play-button"
                        onClick={() => (window.location.href = "/local")}
                    >
                        Local Game
                    </button>
                </div>
                <div className="play-local-online">
                    <h3>Play with a friend online</h3>
                    <button
                        className="play-button"
                        onClick={() => (window.location.href = "/online")}
                    >
                        Online Game
                    </button>
                </div>
            </section>
        </div>
    );
}
