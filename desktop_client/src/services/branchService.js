import api from "./api";

export const create = async (branch) => {
  console.log(branch)
  const  res  = await api.post("/branchOffices/", branch); 
  return res; 
};

export const list = async () => {
  const { data } = await api.get("/branchOffices/");
  return data;
};

export const headers = () => {
  return [
    { key: "id", label: "Id" },
    { key: "name", label: "Nombre" },
    { key: "verificationCode", label: "Codigo" },
    { key: "city", label: "Ciudad" },
    { key: "direction", label: "Direccion" },
    { key: "latitude", label: "latitude" },
    { key: "longitude", label: "longitude" },
  ];
};

