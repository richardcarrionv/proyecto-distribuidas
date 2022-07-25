import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions, DialogContent } from "@mui/material";
import Container from "@mui/material/Container";

const DialogFormContainer = (props) => {
  const { title, open, onClose, onSave } = props;
  const [toast, setToast] = useState(false)

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if(!onSave()){
        setToast(true)
    }
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
        <Snackbar
          open={toast}
          autoHideDuration={4000}
          onClose={() => setToast(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setToast(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
              Todos los campos deben estar completos
          </Alert>
        </Snackbar>
    </Dialog>
  );
};

export default DialogFormContainer;
