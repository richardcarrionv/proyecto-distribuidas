import React, { useState, useEffect } from "react";
import api from "../../../services/api"; 


import BranchForm from "../../forms/branch/branchForm";
import BranchService from "../../../services/branch/branchService";
import CRUD from "../CRUD";

const BranchCRUD = () => {

  let service = new BranchService();
  const voidBranch = {
    name: "",
    code: "",
    city: "",
    direction: "",
    coordinates: "",
  }
  const tableHeaders = service.headers(); 
  const [tableRows, setTableRows] = useState([]);
  const [display, setDisplay] = useState(false);
  const [branch, setBranch] = useState({...voidBranch});

  useEffect(() => {
    api.get("/branchOffices/").then((response) => {
      console.log(response);
      if (!response.data.message) {
        setTableRows(response.data); 
      }
    });
  });

  const handleChange = (key) => (event) => {
    setBranch({ ...branch, [key]: event });
  };

  const handleCoordsChange = (coords) => () => { 
    let coordinates = coords.lat + ",\n"+coords.lng; 
    console.log("From crud", coordinates); 
    setBranch({...branch, coordinates: coordinates })
  }

  const handleSave = () => {
    console.log("Saving"); 
    setDisplay(false);
  };

  const handleEdit = (row) => () => {
    setBranch(row);
    setDisplay(true);
  };

  const handleDelete = (id) => () => {
    console.log("Deleting")
  };

  const handleCreate = () => {
    setBranch({...voidBranch});
    setDisplay(true);
  };

  const handleDialogDisplay = (value) => () => {
    setDisplay(value);
  };

  return (
    <CRUD
      init={branch}
      title="Sucursales"
      tableRows={tableRows}
      tableHeaders={tableHeaders}

      display={display}
      onToggleDisplay={handleDialogDisplay}
      onSave={handleSave}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
    >
      <BranchForm
        branch={branch}
        onSave={handleSave}
        onChange={handleChange}
        onCoordsChange={handleCoordsChange}
      />
    </CRUD>
  );
};

export default BranchCRUD;
