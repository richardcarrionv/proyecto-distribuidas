import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateAlert({ display, text, onAgree, onDecline }) {
  const handleAgree = (event) => {
    onAgree(); 
  };

  const handleDecline = () => {
    onDecline();
  };

  return (
    <div>
      <Dialog
        open={display}
        onClose={handleDecline}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Actualizador</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDecline}>Cancelar</Button>
          <Button onClick={handleAgree} autoFocus> Aceptar </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
