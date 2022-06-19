import "./App.css";
import React from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";
import Login from "./views/login/Login";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
