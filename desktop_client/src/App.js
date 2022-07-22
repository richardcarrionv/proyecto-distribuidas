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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function App() {
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null);
  const [toast, setToast] = useState(false);
  const [display, setDisplay] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [data, setData] = useState({});

  const handleAgree = () => {
    setUpdateAlert(false);
    window.api.send("restart_app");
  };

  const handleDecline = () => { 
    setUpdateAlert(false);
  }

  useEffect(() => {
    window.api.receive("notification", (data) => {
      setData({ ...data });
      setDisplay(true);
    });

    window.api.receive("update_available", () => {
      setToast(true);
    });

    window.api.receive("update_downloaded", () => {
      setUpdateAlert(true);
    });
  });

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
        onDecline={handleDecline}
      />
      <Snackbar
          open={toast}
          autoHideDuration={10000}
          onClose={() => setToast(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setToast(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            !Descargando nueva actualizacion!
          </Alert>
        </Snackbar>
    </>

  );
}

export default App;
