import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Local from "./local/Local";
import Online from "./online/Online";
import Home from "./home/Home";

import "./index.css";

ReactDOM.render(
    <main>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/local" element={<Local />} />
                <Route path="/online" element={<Online />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </main>,
    document.getElementById("root")
);
