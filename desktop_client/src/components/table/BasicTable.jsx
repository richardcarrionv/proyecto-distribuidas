import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const BasicTable = ({ rows, headers }) => {
  const handleDeleteClick = (id) => (event) => {};

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow key="1000">
            {headers.map((header, i) => (
              <TableCell key={i}>{header.label}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              {headers.map((header, i) => (
                <TableCell key={i}>{row[header.key]}</TableCell>
              ))}
              <TableCell key="1230">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                ></Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
