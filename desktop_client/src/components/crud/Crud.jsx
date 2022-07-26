import React, {useState} from "react";

import {Box, Button} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import CrudTable from "./CrudTable";
import DialogFormContainer from "../dialog/DialogFormContainer";
import AlertDialog from "../alerts/DeleteAlert";
import CrudTopBar from "./CrudTopBar";
import BasicInput from "../inputs/BasicInput";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const Crud = ({
                title,

                tableHeaders,
                tableRows,

                display,
                onToggleDisplay,

                onEdit,
                onCreate,
                onSave,
                onDelete,

                onSearch,

                children,
              }) => {
  const [alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(false);
  const [search, setSearch] = useState(null);

  const handleDelete = (id) => (event) => {
    setDeleteId(id);
    setAlert(true);
  };

  const handleAgree = (id) => (event) => {
    setAlert(false);
    const res = onDelete(id)(event)
    console.log(res)
    setToast(res);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    onSearch(event.target.value)
  }

  return (
    <>
      <Box sx={{}}>
        <CrudTopBar title={title} onCreate={onCreate}></CrudTopBar>
      </Box>
      <Box sx={{margin: 2}}>
        <FormControl sx={{width: "25ch", marginBottom: 2}}>
          <TextField
            id="search"
            label="Búsqueda"
            value={search}
            onChange={handleSearchChange}
            variant="standard"
          />
        </FormControl>
        <CrudTable
          rows={tableRows}
          headers={tableHeaders}
          onDelete={handleDelete}
          onEdit={onEdit}
        />
        <DialogFormContainer
          title={title}
          open={display}
          onClose={onToggleDisplay}
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
          anchorOrigin={{vertical: "bottom", horizontal: "right"}}
        >
          <Alert
            onClose={() => setToast(false)}
            severity="success"
            sx={{width: "100%"}}
          >
            ¡Se eliminó el registro con ID: {deleteId} !
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Crud;
