import React, {useState} from "react";

import { Box, Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import CRUDTable from "./table/crudTable";
import DialogContainer from "../dialog/dialogContainer";
import AlertDialog from "../alerts/delete/deleteAlert";

const CRUD = ({ display, service, title, onToggleDisplay, onEdit, onDelete, onCreate, children }) => {

  const [alert, setAlert] = useState(false); 
  const [deleteId, setDeleteId] = useState(null); 
  const [toast, setToast] = useState(false); 

  const rows = service.list();
  const headers = service.headers();

  const handleDialogCloseClick = (event) => {
    onToggleDisplay(false)(event);
  };

  const handleDelete = (id) => (event) => {
    setDeleteId(id); 
    setAlert(true); 
  };

  const handleEdit = (row) => (event) => {
    onEdit(row)(event);
  };

  const handleCreate = (event) => { 
    onCreate(event); 
  }

  const handleAgree = (id) => (event) => { 
    onDelete(id)(event); 
    setAlert(false); 
    setToast(true); 
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{title}</h1>
        <Button
          variant="contained"
          color="success"
          sx={{ height: 40 }}
          onClick={handleCreate}
        >
          Crear {title}
        </Button>
      </Box>
      <CRUDTable
        rows={rows}
        headers={headers}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <DialogContainer
        title={title}
        open={display}
        onClose={handleDialogCloseClick}
      >
        {children}
      </DialogContainer>

      <AlertDialog id={deleteId} display={alert} onAgree={handleAgree} onDecline={
        () => { setAlert(false) }
      }/>

      <Snackbar open={toast} autoHideDuration={4000} onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setToast(false)} severity="success" sx={{ width: '100%' }}>
          ¡Se eliminó el registro con ID: {deleteId} !
        </Alert>
      </Snackbar>
    </>
  );
};

export default CRUD;
