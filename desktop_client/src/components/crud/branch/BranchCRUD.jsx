import React, { useState, useEffect } from "react";
import api from "../../../services/api";

import BranchForm from "../../forms/branch/branchForm";
import { headers, create, list } from "../../../services/branch/branchService";
import CRUD from "../CRUD";

const BranchCRUD = () => {
  const voidBranch = {
    id: null,
    name: "",
    code: "",
    province: "",
    city: "",
    direction: "",
    latitude: "",
    longitude: "",
    phone: "",
    verificationCode: "",
    contactList: [],
    coordinates: "",
  };
  const tableHeaders = headers();
  const [tableRows, setTableRows] = useState([]);
  const [display, setDisplay] = useState(false);
  const [branch, setBranch] = useState({ ...voidBranch });

  useEffect(() => {
    list().then((data) => {
      console.log("Listado: ", data.response);
      setTableRows(data.response);
    });
  }, []);

  const handleChange = (key) => (event) => {
    setBranch({ ...branch, [key]: event });
  };

  const handleCoordsChange = (coords) => () => {
    let coordinates = coords.lat + ",\n" + coords.lng;
    setBranch({
      ...branch,
      coordinates: coordinates,
      latitude: coords.lat,
      longitude: coords.lng,
    });
  };

  const handleSave = () => {
    create(branch).then((res) => console.log(res));
    setDisplay(false);
  };

  const handleEdit = (row) => () => {
    setBranch(row);
    setDisplay(true);
  };

  const handleDelete = (id) => () => {
    console.log("Deleting");
  };

  const handleCreate = () => {
    setBranch({ ...voidBranch });
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
