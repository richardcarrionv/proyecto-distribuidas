import "./App.css";
import React from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import BranchCRUDView from "./views/branch/Branch";
import ContactCRUDView from "./views/contact/Contact";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="home" element={<Home />}>
            <Route path="branch" element={<BranchCRUDView />} />
            <Route path="contact" element={<ContactCRUDView />} />
            <Route path="history" element={"Hola Historial"} />
            <Route path="history/node" element={"Hola Historial por Nodo"} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
