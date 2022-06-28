import api from "../api";

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
    { key: "code", label: "Codigo" },
    { key: "city", label: "Ciudad" },
    { key: "direction", label: "Direccion" },
    { key: "coordinates", label: "Coordenadas" },
  ];
};
//return [
//{
//name: "Sucursal 1",
//code: "2",
//city: "A",
//direction: "B",
//coordinates: "123",
//},
//{
//name: "Sucursal 2",
//code: "1",
//city: "A",
//direction: "B",
//coordinates: "123",
//},
//{
//name: "Sucursal 3",
//code: "3",
//city: "A",
//direction: "B",
//coordinates: "123",
//},
//];
