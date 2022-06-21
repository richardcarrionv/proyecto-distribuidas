import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import BasicInput from "../../components/inputs/basic/basicInput";
import BasicTable from "../../components/table/basic/basicTable";

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
    setSearch({id: "", branch: ""})
  };

  const onChange = (key) => (event) => {
    setSearch({ ...search, [key]: event });
    setRows(rows.filter((row) => row[key].indexOf(event) !== -1));
  };
  return (
    <>
      <h1>Historial</h1>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 1,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
          }}
        >
          <BasicInput value={search.id} name="Id" onChange={onChange("id")} />
          <BasicInput
            value={search.branch}
            name="Sucursal"
            onChange={onChange("branch")}
          />
        </Box>
        <Box>
          <Button sx={{ marginRight: 1 }} variant="contained" onClick={reset}>
            Limpiar
          </Button>
        </Box>
      </Box>

      <BasicTable rows={rows} headers={headers}></BasicTable>
    </>
  );
};

export default AllHistory;
