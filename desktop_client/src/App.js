import "./App.css";
import React, { useState } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import BranchCRUDView from "./views/branch/Branch";
import ContactCRUDView from "./views/contact/Contact";
import UserCRUDView from "./views/user/User";
import AllHistory from "./views/history/allHistory";
import { UserContext } from "./UserContext";

function App() {
  const [id, setId] = useState(null); 
  const [role, setRole] = useState(null)
  return (
    <>
      <UserContext.Provider value={{id: id, setId: setId, role:role, setRole: setRole}}>
        <HashRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />}>
              <Route path="branch" element={<BranchCRUDView />} />
              <Route path="contact" element={<ContactCRUDView />} />
              <Route path="user" element={<UserCRUDView />} />
              <Route path="history" element={<AllHistory />} />
              <Route path="history/node" element={"Hola Historial por Nodo"} />
            </Route>
          </Routes>
        </HashRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
