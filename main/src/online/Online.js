import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Online.css";
import StatusOnline from "./StatusOnline";

export default function Online(props) {
    const { gameId } = useParams();

    if (gameId == "status") return <StatusOnline />;

    return (
        <div className="development">
            <h3>
                This part of the Website is still in development. Try again
                later. Your gameId is "{gameId}".
            </h3>
        </div>
    );
}
