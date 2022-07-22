import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import BranchCRUDView from "./views/branch/Branch";
import ContactCRUDView from "./views/contact/Contact";
import UserCRUDView from "./views/user/User";
import AllHistory from "./views/history/allHistory";
import AlarmView from "./views/AlarmView";
import { UserContext } from "./UserContext";
import AlarmDialog from "./components/dialog/AlarmDialog";
import UpdateAlert from "./components/alerts/UpdateAlert";
import { Container } from "@mui/material";

function App() {
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null);
  const [display, setDisplay] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    window.api.receive("notification", (data) => {
      setData({ ...data });
      setDisplay(true);
    });
    window.api.receive("update_downloaded", () => {
      setUpdateAlert(true);
    });

  });

  const handleAgree = () => { 
    window.api.send("restart_app", ""); 
  }

  return (
    <>
      <UserContext.Provider
        value={{ id: id, setId: setId, role: role, setRole: setRole }}
      >
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
            <Route path="alarm" element={<AlarmView />} />
          </Routes>
        </HashRouter>
      </UserContext.Provider>
      <AlarmDialog
        data={data}
        open={display}
        onClose={() => {
          setDisplay(false);
        }}
      />
      <UpdateAlert
        display={updateAlert}
        onAgree={handleAgree}
      />
    </>
  );
}

export default App;
