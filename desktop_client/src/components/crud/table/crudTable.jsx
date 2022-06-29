import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CRUDTable = ({ rows, headers, onDelete, onEdit }) => {
    const handleDeleteClick = (id) => (event) => {
        onDelete(id)(event);
    };

    const handleEditClick = (row) => (event) => {
        onEdit(row)(event);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow key="1">
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
                            <TableCell align="right">
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "end"
                                    }}>
                                    <Button
                                        sx={{ 
                                            borderRadius: 100,
                                            marginRight: 5
                                        }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleEditClick(row)} >
                                        <EditIcon />
                                    </Button>
                                    <Button
                                        sx={{ 
                                            borderRadius: 100,
                                        }}
                                        variant="contained"
                                        color="error"
                                        onClick={handleDeleteClick(
                                            row[Object.keys(row)[0]]
                                        )}>
                                        <DeleteIcon />
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CRUDTable;
