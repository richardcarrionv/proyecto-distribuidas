import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";

const DialogContainer = (props) => {
  const { title, open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: 2,
        }}
      >
        {props.children}
        <Button
          className="button"
          variant="contained"
          color="error"
          onClick={handleClose}
        >
          Cerrar
        </Button>
      </Container>
    </Dialog>
  );
};

export default DialogContainer;
