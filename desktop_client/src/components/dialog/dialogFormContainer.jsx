import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions, DialogContent } from "@mui/material";
import Container from "@mui/material/Container";

const DialogFormContainer = (props) => {
  const { title, open, onClose, onSave } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <Dialog open={open} maxWidth="100%">
      <DialogTitle sx={{ backgroundColor: "whitesmoke", textAlign: "Center" }}>
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        dividers
      >
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClose}
        >
          Cerrar
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogFormContainer;
