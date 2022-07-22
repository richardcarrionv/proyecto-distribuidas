import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateAlert({ display, onAgree }) {
  const handleAgree = (event) => {
    onAgree();
  };

  return (
    <div>
      <Dialog
        open={display}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Actualizador</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Existe una nueva actualizacion, es necesario reiniciar para
            actualizar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
