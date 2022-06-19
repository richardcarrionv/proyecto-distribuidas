import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const DialogContainer = (props) => {
  const { title, open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      {props.children}
      <Button onClick={handleClose}> Cerrar</Button>
    </Dialog>
  );
};

export default DialogContainer;
