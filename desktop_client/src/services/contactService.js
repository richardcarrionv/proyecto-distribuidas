export default class ContactService {
  constructor() {}

  list() {
    return [
      {
        name: "Richard",
        surname: "Carrion",
        branch: "Sucursal 1",
        phone: "099495",
      },
      {
        name: "Alex",
        surname: "Tigselema",
        branch: "Sucursal 2",
        phone: "1092392",
      },
      {
        name: "Jose",
        surname: "Pazmino",
        branch: "Sucursal 3",
        phone: "09123",
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
      { key: "surname", label: "Apellido" },
      { key: "branch", label: "Sucursal" },
      { key: "phone", label: "Telefono" },
    ];
  }
}
