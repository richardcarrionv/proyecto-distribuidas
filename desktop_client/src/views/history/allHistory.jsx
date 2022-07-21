import { Box, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import BasicTable from "../../components/table/basic/basicTable";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { list, flat, headers, headersWithIgniterData} from "../../services/alarmsHistoryService.js"
import {UserContext} from "../../UserContext";

const AllHistory = () => {
  const user = useContext(UserContext); 
  const [rows, setRows] = useState([]);

  var tableHeaders = headers

  console.log(user)

  if(user.role === "ADMIN"){ 
    tableHeaders = headersWithIgniterData
  }
  console.log(tableHeaders)

  useEffect(() => {
    list()
      .then( res => {
        const alarms = flat(res.data)
        console.log(alarms)
        setRows(alarms)
      })
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#d02f27" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Historial
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ padding: 2 }}>
        <BasicTable rows={rows} headers={tableHeaders}></BasicTable>
      </Box>
    </>
  );
};

export default AllHistory;
