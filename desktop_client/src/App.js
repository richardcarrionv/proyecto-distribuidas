import "./App.css";
import React, { useState, useEffect } from "react";
import Main from "./views/main/Main";
import Login from "./views/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import DialogContainer from "./components/dialog/dialogContainer";
import BranchForm from "./components/forms/branch/branchForm";
import { Button } from "@mui/material";
import Maps from "./components/maps/Maps";

function App() {
  const [open, setOpen] = useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleClickToClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickToOpen}>Abrir</Button>
      <DialogContainer title="Dialogo" open={open} onClose={handleClickToClose}>
        <BranchForm onSave={handleClickToClose}></BranchForm>
      </DialogContainer>

    </>
  );
}

export default App;
