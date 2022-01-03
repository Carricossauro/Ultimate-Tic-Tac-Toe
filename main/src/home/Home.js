import React from "react";

import "./Home.css";

export default function Home() {
    return (
        <div class="home-container">
            <section class="welcome-section">
                <h3>Welcome to the Ultimate Tic Tac Toe Website!</h3>
                <p>
                    If you want to learn how to play the game,{" "}
                    <a
                        class="link"
                        href="https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe"
                        target="_blank"
                    >
                        click here.
                    </a>
                </p>
            </section>
            <section class="play-section">
                <div class="play-local-online">
                    <h3>Play with a friend on your computer</h3>
                    <button
                        class="play-button"
                        onClick={() => (window.location.href = "/local")}
                    >
                        Local Game
                    </button>
                </div>
                <div class="play-local-online">
                    <h3>Play with a friend online</h3>
                    <button
                        class="play-button"
                        onClick={() => (window.location.href = "/online")}
                    >
                        Online Game
                    </button>
                </div>
            </section>
        </div>
    );
}
