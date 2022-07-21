import api from "./api";

export const create = async (user) => {
  const res = await api.post("/users/", user);
  return res;
};

export const findById = async (id) => {
  const res = await api.get("/users/"+id);
  return res;
};
export const list = async () => {
  const response = await api.get("/users/");
  return response;
};

export const update = async (user) => {
  console.log("User", user);
  const response = await api.put(`/users/${user.id}`, user);
  return response;
};

export const del = async (id) => {
  console.log("Id: ", id);
  const response = await api.delete(`/users/${id}`);
  return response;
};

export const exists = async (username, password) => { 
  const response = await api.get(`/users/${username}/${password}`);
  return response;
}

export const headers = [
  { key: "id", label: "Id" },
  { key: "username", label: "Usuario" },
  { key: "password", label: "Contraseña" },
  { key: "presentable_role", label: "Rol" },
];

export const newUser = {
  id: null,
  username: "",
  password: "",
};
