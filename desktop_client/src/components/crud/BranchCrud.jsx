import React, { useState, useEffect } from "react";

import BranchForm from "../forms/BranchForm";
import {
  headers,
  create,
  list,
  del,
  update,
  newBranch,
} from "../../services/branchService";
import Crud from "./Crud";
import useApi from "../../hooks/useApi";
import useDisplay from "../../hooks/useDisplay";
import useForm from "../../hooks/useForm";

const BranchCrud = () => {

  const API_URL = "/branches"
  const tableHeaders = headers;

  const displayForm = useDisplay(false)
  const [branch, setBranch] = useState({ ...newBranch });
  const api = useApi(API_URL);

  const form = useForm({...newBranch}, displayForm, api)

  const handleCoordsChange = (coords) => () => {
    form.setEntity({...form.entity, latitude: coords.lat, longitude:coords.lng})
  };

  return (
    <Crud
      title="Sucursales"

      tableRows={api.data}
      tableHeaders={tableHeaders}

      display={displayForm.display}
      onToggleDisplay={displayForm.hide}

      init={form.entity}
      onSave={form.save}
      onEdit={form.edit}
      onSearch={api.filter}
      onDelete={form.del}
      onCreate={form.createNew}
    >
      <BranchForm
        branch={form.entity}
        onSave={form.save}
        onChange={form.handleChange}
        onCoordsChange={handleCoordsChange}
      />
    </Crud>
  );
};

export default BranchCrud;
