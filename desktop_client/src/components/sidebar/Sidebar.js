import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Box sx={{bgcolor: "background.paper" }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Nodos" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
