import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Divider, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessIcon from '@mui/icons-material/Business';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';

const Sidebar = () => {
  let navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState();

  const handleClick = (path, index) => (event) => {
    setSelectedIndex(index);
    navigate(path);
  };

  const drawerWidth = 340;
  const sections = [
    { label: "Nodos/Sucursales", icon: <BusinessIcon />, link: "/home/branch" },
    { label: "Contactos", icon: <ConnectWithoutContactIcon /> , link: "/home/contact" },
    { label: "Usuarios", icon: <AccountCircleIcon />, link: "/home/user" },
    { label: "Historial", icon: <HistoryIcon />, link: "/home/history" },
  ];

  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: drawerWidth }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <EmergencyShareIcon sx={{color: "#d02f27", fontSize: "x-large"}}/>
        <Typography variant="h6" sx={{marginLeft: "10px"}}>
            One Alarm
          </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sections.map((section, index) => (
            <ListItem key={section.label} disablePadding>
              <ListItemButton
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#dfdfdf"
                  },
                  "&.Mui-focusVisible": {
                  },
                  ":hover": {
                  },
                }}
                selected={index == selectedIndex}
                onClick={handleClick(section.link, index)}
              >
                <ListItemIcon>
                  {section.icon}
                </ListItemIcon>
                <ListItemText primary={section.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
