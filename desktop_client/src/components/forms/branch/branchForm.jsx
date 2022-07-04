import { Button, Container, Dialog, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import BasicInput from "../../inputs/basic/basicInput";
import Maps from "../../maps/Maps";
import FormControl from "@mui/material/FormControl";

import Geocode from "react-geocode";
import { Box } from "@mui/system";

const { REACT_APP_MAPS_API_KEY } = process.env;
Geocode.setApiKey(REACT_APP_MAPS_API_KEY);

const BranchForm = ({ branch, onChange, onCoordsChange }) => {

  const initCoords = { lat: -0.1824739406812052, lng: -78.46213540619937 };
  const [mapZoom, setMapZoom] = useState(8);
  const [mapCenter, setMapCoords] = useState({ ...initCoords });

  const searchDirection = () => {
    var address = branch.direction + "," + branch.city + "," + branch.province;
    console.log(address);
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const coords = { lat: lat, lng: lng };
        console.log("Encontrado: ", lat, lng);
        setMapZoom(16);
        setMapCoords(coords);
        onCoordsChange(coords)();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleMapSave = (coords) => () => {
    console.log("From form", coords);
    onCoordsChange(coords)();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Container>
        <BasicInput
          value={branch.name}
          name="Nombre"
          onChange={onChange("name")}
        ></BasicInput>

        <BasicInput
          value={branch.code}
          name="Codigo"
          onChange={onChange("code")}
        ></BasicInput>

        <BasicInput
          value={branch.province}
          name="Provincia"
          onChange={onChange("province")}
        ></BasicInput>

        <BasicInput
          value={branch.city}
          name="Ciudad"
          onChange={onChange("city")}
        ></BasicInput>

        <FormControl sx={{ m: 1, width: "25ch" }}>
          <TextField
            id="outlined-multiline-static"
            value={branch.direction}
            label="Direccion"
            multiline
            onChange={(event) => onChange("direction")(event.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "25ch" }}>
          <TextField
            id="outlined-multiline-static"
            value={branch.coordinates}
            label="Coordenadas"
            multiline
            fullWidth
            rows={2}
            onChange={onChange("coordinates")}
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>

        <Button
          className="button"
          variant="contained"
          onClick={searchDirection}
          sx={{ width: "230px" }}
        >
          Buscar Direccion
        </Button>
      </Container>
      <Box sx={{ width: "80%" }}>
        <Maps zoom={mapZoom} center={mapCenter} onSave={handleMapSave} />
      </Box>
    </Box>
  );
};
export default BranchForm;
