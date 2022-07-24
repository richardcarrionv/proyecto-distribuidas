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
        <DialogTitle id="alert-dialog-title">Nueva Actualizacion Disponible</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Es necesario reiniciar para actualizar de version.
              Si no reinicia ahora se instalara la nueva version al cerra la aplicacion. 
              ¿Reinicar ahora?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onDecline}>No</Button>
          <Button onClick={onAgree} autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
