import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import TopBar from "../../components/crud/topbar/TopBar";
import BasicInput from "../../components/inputs/basic/basicInput";
import BasicTable from "../../components/table/basic/basicTable";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const AllHistory = () => {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);

  const [search, setSearch] = useState({
    id: "",
    branch: "",
  });

  useEffect(() => {
    setRows([
      {
        id: "123",
        date: new Date(Date.now()).toLocaleDateString(),
        branch: "Tia 1",
      },
      {
        id: "456",
        date: new Date(Date.now()).toLocaleDateString(),
        branch: "Aki 2",
      },
      {
        id: "678",
        date: new Date(Date.now()).toLocaleDateString(),
        branch: "Sucursal 3",
      },
    ]);
    setHeaders([
      { key: "id", label: "ID" },
      { key: "date", label: "Fecha" },
      { key: "branch", label: "Sucursal" },
    ]);
  }, []);

  const reset = () => {
    setRows([
      {
        id: "123",
        date: new Date(Date.now()).toLocaleDateString(),
        branch: "Tia 1",
      },
      {
        id: "456",
        date: new Date(Date.now()).toLocaleDateString(),
        branch: "Aki 2",
      },
      {
        id: "678",
        date: new Date(Date.now()).toLocaleDateString(),
        branch: "Sucursal 3",
      },
    ]);
    setSearch({ id: "", branch: "" });
  };

  const onChange = (key) => (event) => {
    setSearch({ ...search, [key]: event });
    setRows(rows.filter((row) => row[key].indexOf(event) !== -1));
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#d02f27" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Historial
            </Typography>
            <BasicInput value={search.id} name="Id" onChange={onChange("id")} />
            <BasicInput
              value={search.branch}
              name="Sucursal"
              onChange={onChange("branch")}
            />
            <Button onClick={reset} color="inherit">
              Limpiar Busqueda
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ padding: 2 }}>
        <BasicTable rows={rows} headers={headers}></BasicTable>
      </Box>
    </>
  );
};

export default AllHistory;
