import React, { useState, useParams } from "react";
import { io } from "socket.io-client";

export default function Setup({ gameId }) {
    const [name, setName] = useState("");

    const storeAccount = (playerId) => {
        console.log(`Contacting server ${process.env.REACT_APP_SERVER_IP}`);
        try {
            localStorage.setItem("id", playerId);
            console.log(`Stored user id ${playerId}`);
            window.location.href = `/online/${gameId}`;
        } catch (error) {
            window.location.href = "/home";
        }
    };

    async function createAccount() {
        if (name) {
            try {
                const socket = io(process.env.REACT_APP_SERVER_IP);
                socket.on("connect", () => {
                    console.log("Connected with id " + socket.id);
                });

                socket.emit("create-account", name, storeAccount);
            } catch (error) {
                window.location.href = "/home";
            }
        }
    }

    return (
        <div className="development">
            <h3 className="choose-name">Please choose a name</h3>
            <input
                autoComplete="off"
                className="name-input"
                type="text"
                placeholder="Example"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="create-button" onClick={createAccount}>
                Register
            </button>
        </div>
    );
}
