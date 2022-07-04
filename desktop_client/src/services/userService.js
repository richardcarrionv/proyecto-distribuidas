export default class ContactService {
  constructor() {}

  list() {
    return [
      {
        username: "Username1",
        password: "099495",
        role: "admin",
      },
      {
        username: "Username2",
        password: "1092392",
        role: "admin",
      },
      {
        username: "Username3",
        password: "09123",
        role: "subscriber",
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
      { key: "username", label: "Username" },
      { key: "password", label: "Password" },
      { key: "role", label: "Rol" },
    ];
  }
}
