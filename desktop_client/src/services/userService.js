import api from "./api";

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
  role: "CLIENT",
};
