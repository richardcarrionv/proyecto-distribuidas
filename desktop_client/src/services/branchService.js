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
  { key: "phone", label: "Telefono" },
  { key: "latitude", label: "Latitud" },
  { key: "longitude", label: "Longitud" },
  { key: "username", label: "Usuario" },
  { key: "password", label: "Contraseña" },
];

export const newBranch = {
  id: null,
  name: "",
  username: "",
  password: "",
  province: "",
  city: "",
  address: "",
  latitude: "",
  longitude: "",
  phone: "",
  verificationCode: "1111",
};
