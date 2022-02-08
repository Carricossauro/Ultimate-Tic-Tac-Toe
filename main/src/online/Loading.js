import React from "react";
import { Oval } from "react-loader-spinner";

import "./New.css";

export default function Loading() {
    return (
        <div className="loading-wheel">
            <Oval />
        </div>
    );
}
