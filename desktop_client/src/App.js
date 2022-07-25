import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import Sidebar from "./components/sidebar/Sidebar";
import BranchesView from "./views/BranchesView";
import IgnitersView from "./views/IgnitersView";
import UsersView from "./views/UserView";
import AlarmHistoryView from "./views/AlarmHistoryView";
import AlarmsView from "./views/AlarmsView";
import { UserContext } from "./UserContext";
import AlarmDialog from "./components/dialog/AlarmDialog";
import UpdateAlert from "./components/alerts/UpdateAlert";
import { Container } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useDisplay from "./hooks/useDisplay";
import MapView from "./views/MapView"

function App() {
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null);
  const [progress, setProgress] = useState("Descargando actualizacion")
  const [data, setData] = useState({});

  const displayUpdateAlert = useDisplay(false);
  const displayToast = useDisplay(false)
  const displayAlarmDialog = useDisplay(false);

  const handleAgree = () => {
    window.api.send("restart_app", "");
    displayUpdateAlert.hide();
  };

  useEffect(() => {
    window.api.receive("notification", (data) => {
      setData({ ...data });
      displayAlarmDialog.show();
    });

    window.api.receive("update_available", () => {
      displayToast.show();
    });

    window.api.receive("download_progress", (downloadProgress) => {
      setProgress("Descargando actualizacion: "+downloadProgress);
    });

    window.api.receive("update_downloaded", () => {
      displayUpdateAlert.show()
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
              <Route path="contact" element={<IgnitersView />} />
              <Route path="user" element={<UsersView />} />
              <Route path="history" element={<AlarmHistoryView />} />
              <Route path="map" element={<MapView />} />
              <Route path="history/node" element={"Hola Historial por Nodo"} />
            </Route>
            <Route path="alarm" element={<AlarmsView />} />
          </Routes>
        </HashRouter>
      </UserContext.Provider>
      <AlarmDialog
        data={data}
        display={displayAlarmDialog.display}
        onClose={displayAlarmDialog.hide}
      />
      <UpdateAlert
        display={displayUpdateAlert.display}
        onAgree={handleAgree}
        onDecline={displayUpdateAlert.hide}
      />
      <Snackbar
          open={displayToast.display}
          onClose={() => {} }
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={displayToast.hide}
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
