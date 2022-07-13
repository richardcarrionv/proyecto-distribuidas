import React, { useState } from "react";

import { Box, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import CRUDTable from "./table/crudTable";
import DialogFormContainer from "../dialog/dialogFormContainer";
import AlertDialog from "../alerts/delete/deleteAlert";
import TopBar from "./topbar/TopBar";

const CRUD = ({
  display,
  title,
  tableHeaders,
  tableRows,

  onToggleDisplay,
  onEdit,
  onCreate,
  onSave,

  onDelete,

  children,
}) => {
  const [alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(false);

  const handleDelete = (id) => (event) => {
    setDeleteId(id);
    setAlert(true);
  };

  const handleAgree = (id) => (event) => {
    setAlert(false);
    setToast(onDelete(id)(event));
  };

  return (
    <>
      <Box sx={{}}>
        <TopBar title={title} onCreate={onCreate}></TopBar>
      </Box>

      <Box sx={{ margin: 2 }}>
        <CRUDTable
          rows={tableRows}
          headers={tableHeaders}
          onDelete={handleDelete}
          onEdit={onEdit}
        />
        <DialogFormContainer
          title={title}
          open={display}
          onClose={onToggleDisplay(false)}
          onSave={onSave}
        >
          {children}
        </DialogFormContainer>

        <AlertDialog
          id={deleteId}
          display={alert}
          onAgree={handleAgree}
          onDecline={() => {
            setAlert(false);
          }}
        />

        <Snackbar
          open={toast}
          autoHideDuration={4000}
          onClose={() => setToast(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setToast(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            ¡Se eliminó el registro con ID: {deleteId} !
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default CRUD;
