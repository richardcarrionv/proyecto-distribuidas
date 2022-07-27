import {Button, Container, Dialog, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {useState} from "react";
import BasicInput from "../inputs/BasicInput";
import Maps from "../maps/Maps";
import FormControl from "@mui/material/FormControl";

import Geocode from "react-geocode";
import {Box} from "@mui/system";
import {Marker} from "@react-google-maps/api";

const {REACT_APP_MAPS_API_KEY} = process.env;
Geocode.setApiKey(REACT_APP_MAPS_API_KEY);

const BranchForm = ({branch, onChange, onCoordsChange}) => {
  const initCoords = {lat: -0.1824739406812052, lng: -78.46213540619937};
  const [zoom, setZoom] = useState(8);
  const [center, setCenter] = useState(initCoords);
  const [marker, setMarker] = useState(initCoords);

  useEffect(() => {
    if (branch.longitude !== "" && branch.latitude !== "") {
      const lat = parseFloat(branch.latitude);
      const lng = parseFloat(branch.longitude);
      const coords = {lat: lat, lng: lng};
      setCenter(coords);
      setMarker(coords)
      setZoom(16);
    }
  }, []);

  useEffect(() => {
  }, [center])

  const searchDirection = () => {
    const address = branch.direction + "," + branch.city + "," + branch.province;
    Geocode.fromAddress(address).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        const coords = {lat: lat, lng: lng};
        setZoom(16);
        setCenter(coords);
        setMarker(coords)
        onCoordsChange(coords)();
      },
      (error) => {
      }
    );
  };

  const handleMarkerCoordsChange = (coords) => () => {
    setMarker(coords)
    onCoordsChange(coords)();
  };

  return (
    <Box sx={{display: "flex"}}>
      <Container>
        <BasicInput
          value={branch.name}
          name="Nombre"
          onChange={onChange("name")}
        ></BasicInput>

        <BasicInput
          value={branch.username}
          name="Usuario"
          onChange={onChange("username")}
        ></BasicInput>

        <BasicInput
          value={branch.password}
          name="Contraseña"
          onChange={onChange("password")}
        ></BasicInput>

        <BasicInput
          value={branch.phone}
          name="Telefono"
          onChange={onChange("phone")}
          type="number"
          limit={10}
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

        <FormControl sx={{m: 1, width: "25ch"}}>
          <TextField
            id="outlined-multiline-static"
            value={branch.address}
            label="Direccion"
            multiline

            onChange={(event) => onChange("address")(event.target.value)}
          />
        </FormControl>

        <FormControl sx={{m: 1, width: "25ch"}}>
          <TextField
            id="outlined-multiline-static"
            value={branch.latitude}
            label="Latitud"
            InputProps={{
              readOnly: true,
            }}
            onChange={(event) => onChange("latitude")(event.target.value)}
          />
        </FormControl>

        <FormControl sx={{m: 1, width: "25ch"}}>
          <TextField
            id="outlined-multiline-static"
            value={branch.longitude}
            label="Longitud"
            InputProps={{
              readOnly: true,
            }}
            onChange={(event) => onChange("longitude")(event.target.value)}
          />
        </FormControl>

        <Button
          className="button"
          variant="contained"
          onClick={searchDirection}
          sx={{width: "230px"}}
        >
          Buscar Direccion
        </Button>
      </Container>
      <Box sx={{width: "80%"}}>
        <Maps zoom={zoom} center={center} onMarkerCoordsChange={handleMarkerCoordsChange}>
          <Marker position={marker}/>
        </Maps>
      </Box>
    </Box>
  );
};
export default BranchForm;
