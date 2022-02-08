import React from "react";

export default function GameInfo({ p1, p2, playing, game }) {
    const winner = () => {
        if (game["winner"] === null) return null;
        else if (p1 && game["winner"] === p1["_id"]) return p1["name"];
        else if (p2) return p2["name"];

        return "???";
    };

    return (
        <div>
            <div className="game-info-online">
                <h3>
                    {game["status"]
                        ? `${winner()} wins!`
                        : playing()
                        ? "It's your turn"
                        : "Waiting for your opponent..."}
                </h3>
            </div>

            <div className="player-info-online">
                <h3>{p1 ? p1["name"] : "???"}</h3>
                <div className="info-table">
                    <div></div>
                    <div className="table-element r">Wins</div>
                    <div className="table-element">
                        {p1 ? p1["wins"] : "???"}
                    </div>
                    <div></div>
                    <div></div>
                    <div className="table-element t b r">Ties</div>
                    <div className="table-element t b">
                        {p1 ? p1["ties"] : "???"}
                    </div>
                    <div></div>
                    <div></div>
                    <div className="table-element r">Losses</div>
                    <div className="table-element">
                        {p1 ? p1["losses"] : "???"}
                    </div>
                    <div></div>
                </div>
                <h3>{p2 ? p2["name"] : "???"}</h3>
                <div className="info-table">
                    <div></div>
                    <div className="table-element r">Wins</div>
                    <div className="table-element">
                        {p2 ? p2["wins"] : "???"}
                    </div>
                    <div></div>
                    <div></div>
                    <div className="table-element t b r">Ties</div>
                    <div className="table-element t b">
                        {p2 ? p2["ties"] : "???"}
                    </div>
                    <div></div>
                    <div></div>
                    <div className="table-element r">Losses</div>
                    <div className="table-element">
                        {p2 ? p2["losses"] : "???"}
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
