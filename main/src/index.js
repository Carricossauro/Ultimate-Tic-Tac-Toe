import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import NavBar from "./NavBar";
import Local from "./local/Local";
import Online from "./online/Online";
import Home from "./home/Home";
import Footer from "./Footer";
import "./index.css";
require("dotenv").config({ path: __dirname + "/../.env" });

ReactDOM.render(
    <main>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/local" element={<Local />} />
                <Route path="/online/:gameId" element={<Online />} />
                <Route
                    path="/online"
                    element={<Navigate to="/online/status" />}
                />
                <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
        </Router>
    </main>,
    document.getElementById("root")
);
