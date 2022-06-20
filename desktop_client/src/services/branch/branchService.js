export default class BranchService {
  constructor() {}

  list() {
    return [
      {
        name: "Sucursal 1",
        code: "2",
        city: "A",
        direction: "B",
        coordinates: "123",
      },
      {
        name: "Sucursal 2",
        code: "1",
        city: "A",
        direction: "B",
        coordinates: "123",
      },
      {
        name: "Sucursal 3",
        code: "3",
        city: "A",
        direction: "B",
        coordinates: "123",
      },
    ];
  }

  edit(branch) {
    console.log(branch);
  }

  delete(id) {
    console.log(id);
  }

  headers() {
    return [
      { key: "name", label: "Nombre" },
      { key: "code", label: "Codigo" },
      { key: "city", label: "Ciudad" },
      { key: "direction", label: "Direccion" },
      { key: "coordinates", label: "Coordenadas" },
    ];
  }
}
