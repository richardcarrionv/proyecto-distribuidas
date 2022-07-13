import React, { useState, useEffect } from "react";

import BranchForm from "../../forms/branch/branchForm";
import {
  headers,
  create,
  list,
  del,
  update,
  newBranch,
} from "../../../services/branchService";
import CRUD from "../CRUD";

const BranchCRUD = () => {
  const tableHeaders = headers;
  const [tableRows, setTableRows] = useState([]);
  const [display, setDisplay] = useState(false);
  const [branch, setBranch] = useState({ ...newBranch });

  useEffect(() => {
    list().then((response) => {
      if (response.status === 200) {
        setTableRows(response.data);
      }
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
    if (branch.id == null) {
      create(branch).then((res) => console.log(res));
    } else {
      update(branch).then((res) => console.log(res));
    }
    setDisplay(false);
  };

  const handleEdit = (row) => () => {
    setBranch(row);
    setDisplay(true);
  };

  const handleDelete = (id) => () => {
    return del(id).then(res => res.status == 200)
  };

  const handleCreate = () => {
    setBranch({ ...newBranch });
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
