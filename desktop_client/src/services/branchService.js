import api from "./api";

export const existsBranchUser = async (username, password) => { 
  const response = await api.get(`/branches/${username}/${password}`);
  return response;
}

export const headers = [
  { key: "id", label: "Id" },
  { key: "name", label: "Nombre" },
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
  username: "",
  password: "",
  address: "",
  latitude: "",
  longitude: "",
  phone: "",
  verificationCode: "",
  coordinates: "",
};
