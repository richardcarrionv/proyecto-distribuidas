import React from "react";

import { Box, Button } from "@mui/material";

import BasicTable from "../table/basicTable";
import DialogContainer from "../dialog/dialogContainer";

const CRUD = ({ display, service, title, onToggleDisplay, onEdit, onDelete, onCreate, children }) => {
  const rows = service.list();

  const headers = service.headers();

  const handleDialogCloseClick = (event) => {
    onToggleDisplay(false)(event);
  };

  const handleOnDelete = (id) => (event) => {
    onDelete(id)(event); 
  };

  const handleOnEdit = (row) => (event) => {
    onEdit(row)(event);
  };

  const handleCreate = (event) => { 
    onCreate(event); 
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
      <BasicTable
        rows={rows}
        headers={headers}
        onDelete={handleOnDelete}
        onEdit={handleOnEdit}
      />
      <DialogContainer
        title={title}
        open={display}
        onClose={handleDialogCloseClick}
      >
        {children}
      </DialogContainer>
    </>
  );
};

export default CRUD;
