import api from "./api";

const RESOURCE = "/igniters/"

export const list = async () => {
  const response = await api.get(RESOURCE);
  return response;
};

export const create = async (igniter) => {
  const  res  = await api.post(RESOURCE, igniter); 
  return res; 
};

export const headers = [
      { key: "name", label: "Nombre" },
      { key: "surname", label: "Apellido" },
      { key: "phone", label: "Telefono" },
      { key: "ci", label: "Cedula" },
      { key: "password", label: "Contraseña" },
];

export const newIgniter = { 
    id: null,
    name: "",
    surname: "",
    phone: "",
    password: "default", 
    ci: "",
    branchId: 0,
}

