import React, {useContext} from "react";

import IgniterForm from "../forms/IgniterForm";
import {headers, newIgniter} from "../../services/igniterService";
import Crud from "./Crud";
import {UserContext} from "../../UserContext";
import useApi from "../../hooks/useApi";
import useDisplay from "../../hooks/useDisplay";
import useForm from "../../hooks/useForm";

const IgniterCrud = () => {

  const API_URL = "/igniters"
  const tableHeaders = headers;
  const formatter = (data) => {
    return data.map(d => {
        return {...d, branchId: d.branch.id}
    }).filter( d => d.branchId === user.id);
  }

  const user = useContext(UserContext);

  const api = useApi(API_URL, formatter);
  const displayForm = useDisplay(false)
  const form = useForm({...newIgniter}, displayForm, api)

  const handleCreate = () => {
    form.createNewWithCustomProperties({branchId: user.id})
  };

  return (
    <Crud
      title="Contactos"

      tableRows={api.data}
      tableHeaders={tableHeaders}

      display={displayForm.display}
      onToggleDisplay={displayForm.hide}

      init={form.entity}
      onSave={form.save}
      onEdit={form.edit}
      onSearch={api.filter}
      onDelete={form.del}
      onCreate={handleCreate}
    >
      <IgniterForm
        igniter={form.entity}
        onSave={form.save}
        onChange={form.handleChange}
      />
    </Crud>
  );
};

export default IgniterCrud;
