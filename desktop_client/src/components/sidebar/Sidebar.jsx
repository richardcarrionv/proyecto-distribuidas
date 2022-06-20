import React from "react";
import { useNavigate } from "react-router-dom";


import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";


const Sidebar = () => {
  let navigate = useNavigate();

  const handleClick = (path) => (event) => {
    navigate(path);
  };

  return (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          height: "80vh",
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
          padding: 0,
        }}
      >
        <TreeItem
          nodeId="1"
          label="Nodos/Sucursales"
          onClick={handleClick("/home/branch")}
        ></TreeItem>
        <TreeItem
          nodeId="2"
          label="Contactos"
          onClick={handleClick("/home/contact")}
        ></TreeItem>
        <TreeItem nodeId="5" label="Historial">
          <TreeItem
            label="Todo"
            onClick={handleClick("/home/history")}
          ></TreeItem>
          <TreeItem
            label="Por Nodo"
            onClick={handleClick("/home/history/node")}
          ></TreeItem>
        </TreeItem>
      </TreeView>
    </>
  );
};

export default Sidebar;
