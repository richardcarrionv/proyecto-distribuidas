import api from "./api";

export const list = async () => {
  const response = await api.get("/alarms");
  return response;
};

export const flat = (alarms) => {
  return alarms.map((alarm) => {

    const date = new Date(alarm.date);
    const formattedDate = date.toLocaleString();
    const ig = alarm.igniter;
    const br = alarm.igniter.branch;
    return {
      ...alarm,
      comparableDate: date,
      igniterName: ig.name+" "+ig.surname,
      igniterCi: ig.ci,
      igniterLastName: ig.surname,
      branchId: br.id,
      pres_date: formattedDate,
      branch: br.name,
      province: br.province,
      city: br.city,
      address: br.address,
      latitude: br.latitude,
      longitude: br.longitude,
    };
  });
};

export const headers = [
  { key: "id", label: "Id" },
  { key: "branch", label: "Sucursal" },
  { key: "province", label: "Provincia" },
  { key: "city", label: "Ciudad" },
  { key: "address", label: "Direccion" },
  { key: "date", label: "Fecha" },
  { key: "latitude", label: "Latitud" },
  { key: "longitude", label: "Longitud" },
];
export const headersWithIgniterData = [
  { key: "id", label: "Id" },
  {key: "branchId", label: "Id Sucursal"},
  { key: "branch", label: "Sucursal" },
  { key: "province", label: "Provincia" },
  { key: "city", label: "Ciudad" },
  { key: "address", label: "Direccion" },
  { key: "pres_date", label: "Fecha" },
  { key: "igniterName", label: "Contacto" },
  { key: "igniterCi", label: "Cedula" },
  { key: "latitude", label: "Latitud" },
  { key: "longitude", label: "Longitud" },
];
