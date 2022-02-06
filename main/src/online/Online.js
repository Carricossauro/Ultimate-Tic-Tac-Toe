import React from "react";
import { useParams } from "react-router-dom";

import "./Online.css";
import StatusOnline from "./StatusOnline";
import New from "./New";

export default function Online(props) {
    const { gameId } = useParams();

    if (gameId === "status") return <StatusOnline />;
    if (gameId === "new") return <New />;

    return (
        <div className="development">
            <h3>
                This part of the Website is still in development. Try again
                later. Your gameId is "{gameId}".
            </h3>
        </div>
    );
}
