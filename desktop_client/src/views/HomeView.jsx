import { Box, Button } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import "./home.css";

const HomeView = () => {
  let navigate = useNavigate();

  const handleClick = (event) => {
    navigate("/");
  };

  return (
    <Box className="grid-box">
      <Sidebar />
      <Box className="content">
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeView;
