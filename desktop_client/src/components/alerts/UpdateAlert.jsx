import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateAlert({  display, onAgree, onDecline }) {

  return (
    <div>
      <Dialog
        open={display}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Nueva Actualización Disponible</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Es necesario reiniciar para actualizar de versión.
              Si no reinicia ahora se instalará la nueva versión al cerrar la aplicación. 
              ¿Reiniciar ahora?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onDecline}>No</Button>
          <Button onClick={onAgree} autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
