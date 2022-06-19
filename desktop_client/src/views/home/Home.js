import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DialogContainer from "../../components/dialog/dialogContainer";
import BranchForm from "../../components/forms/branch/branchForm";

const Home = () => {
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
};

export default Home;
