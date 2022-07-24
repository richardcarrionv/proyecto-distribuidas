import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import Sidebar from "./components/sidebar/Sidebar";
import BranchesView from "./views/BranchesView";
import ContactsView from "./views/ContactsView";
import UsersView from "./views/UserView";
import AlarmHistoryView from "./views/AlarmHistoryView";
import AlarmsView from "./views/AlarmsView";
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
  const [progress, setProgress] = useState("Descargando actualizacion")
  const [display, setDisplay] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [data, setData] = useState({});

  const handleAgree = () => {
    setUpdateAlert(false);
    window.api.send("restart_app", "");
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

    window.api.receive("download_progress", (downloadProgress) => {
      setProgress("Descargando actualizacion: "+downloadProgress);
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
            <Route index element={<LoginView />} />
            <Route path="home" element={<HomeView />}>
              <Route path="branch" element={<BranchesView />} />
              <Route path="contact" element={<ContactsView />} />
              <Route path="user" element={<UsersView />} />
              <Route path="history" element={<AlarmHistoryView />} />
              <Route path="history/node" element={"Hola Historial por Nodo"} />
            </Route>
            <Route path="alarm" element={<AlarmsView />} />
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
          onClose={() => {} }
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setToast(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {progress}
          </Alert>
        </Snackbar>
    </>

  );
}

export default App;
