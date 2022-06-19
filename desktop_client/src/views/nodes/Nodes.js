import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import BasicTable from "../../components/table/basicTable";
import DialogContainer from "../../components/dialog/dialogContainer";
import BranchForm from "../../components/forms/branch/branchForm";

const Nodes = () => {
  const title = "Nodos/Sucursales";
  const [display, setDisplay] = useState(false);

  const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
  };

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "calories", label: "Calorias" },
    { key: "fat", label: "Grasa" },
    { key: "carbs", label: "Carbohidratos" },
    { key: "protein", label: "Proteina" },
  ];

  const handleDialogCloseClick = (event) => {
    setDisplay(false);
  };

  const handleDialogOpenClick = (event) => {
    setDisplay(true);
  };

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
          onClick={handleDialogOpenClick}
        >
          Crear Sucursal
        </Button>
      </Box>
      <BasicTable rows={rows} columns={columns} />
      <DialogContainer
        title={title}
        open={display}
        onClose={handleDialogCloseClick}
      >
        <BranchForm onSave={handleDialogCloseClick} />
      </DialogContainer>
    </>
  );
};

export default Nodes;
