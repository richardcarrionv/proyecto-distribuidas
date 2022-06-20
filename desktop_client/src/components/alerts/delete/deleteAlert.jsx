import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteAlert({ display, id, onAgree, onDecline }) {
  const handleAgree = (event) => {
    onAgree(id)(event);
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
        <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de eliminar el registro con id: {id} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDecline}>Cancelar</Button>
          <Button onClick={handleAgree} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
