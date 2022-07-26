import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, Divider, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessIcon from "@mui/icons-material/Business";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";
import { UserContext } from "../../UserContext";
import MapIcon from '@mui/icons-material/Map';

const Sidebar = () => {
  const user = useContext(UserContext);
  let navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState();

  const handleClick = (path, index) => (event) => {
    setSelectedIndex(index);
    navigate(path);
  };

  const drawerWidth = 340;
  var sections = [];
  console.log(user);
  if (user.role === "ADMIN") {
    sections = [
      {
        label: "Contactos",
        icon: <ConnectWithoutContactIcon />,
        link: "/home/contact",
      },
      { label: "Historial", icon: <HistoryIcon />, link: "/home/history" },
      { label: "Mapa", icon: <MapIcon />, link: "/home/map" },
    ];
  } else if (user.role === "CLIENT") {
    sections = [
      { label: "Historial", icon: <HistoryIcon />, link: "/home/history" },
      { label: "Mapa", icon: <MapIcon />, link: "/home/map" },
    ];
  } else if (user.role === "SUPERADMIN") {
    sections = [
      { label: "Clientes", icon: <AccountCircleIcon />, link: "/home/user" },
      {
        label: "Nodos/Sucursales",
        icon: <BusinessIcon />,
        link: "/home/branch",
      },
      { label: "Historial", icon: <HistoryIcon />, link: "/home/history" },
      { label: "Mapa", icon: <MapIcon />, link: "/home/map" },
    ];
  }
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: drawerWidth }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", width: 220 }}>
        <EmergencyShareIcon sx={{ color: "#d02f27", fontSize: "x-large" }} />
        <Typography variant="h6" sx={{ marginLeft: "10px" }}>
          One Alarm
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{display: "flex", alignItems: "space-between", flexDirection: "column", }}>
        <Box sx={{ overflow: "auto", width: 220 }}>
          <List>
            {sections.map((section, index) => (
              <ListItem key={section.label} disablePadding>
                <ListItemButton
                  sx={{
                    "&.Mui-selected": { backgroundColor: "#dfdfdf" },
                    "&.Mui-focusVisible": {},
                    ":hover": {},
                  }}
                  selected={index == selectedIndex}
                  onClick={handleClick(section.link, index)}
                >
                  <ListItemIcon>{section.icon}</ListItemIcon>
                  <ListItemText primary={section.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Button color="error" onClick={() => navigate("/")}>Cerrar Sesión</Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
