import api from "./api";

export const create = async (branch) => {
  const res = await api.post("/branches/", branch);
  return res;
};

export const list = async () => {
  const response = await api.get("/branches/");
  return response;
};

export const update = async (branch) => {
  console.log("Branch", branch);
  const response = await api.put(`/branches/${branch.id}`, branch);
  return response;
};

export const del = async (id) => { 
  console.log("Id: ", id)
  const response = await api.delete(`/branches/${id}`);
  return response;
}

export const existsBranchUser = async (username, password) => { 
  const response = await api.get(`/branches/${username}/${password}`);
  return response;
}

export const headers = [
  { key: "id", label: "Id" },
  { key: "name", label: "Nombre" },
  { key: "verificationCode", label: "Codigo" },
  { key: "province", label: "Provincia" },
  { key: "city", label: "Ciudad" },
  { key: "address", label: "Direccion" },
  { key: "latitude", label: "Latitud" },
  { key: "longitude", label: "Longitud" },
  { key: "username", label: "Usuario" },
  { key: "password", label: "Contraseña" },
];

export const newBranch = {
  id: null,
  name: "",
  province: "",
  city: "",
  address: "",
  latitude: "",
  longitude: "",
  phone: "",
  verificationCode: "",
  coordinates: "",
};
