import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions, DialogContent } from "@mui/material";
import Container from "@mui/material/Container";
import Maps from "../maps/Maps";import {useEffect} from "react";


const AlarmDialog = ({data, open, onClose}) => {

  const initCoords = { lat: -0.1824739406812052, lng: -78.46213540619937 };
  const [mapZoom, setMapZoom] = useState(8);
  const [mapCenter, setMapCoords] = useState({ ...initCoords });



  useEffect(() => {
    const lat = parseFloat(data.latitude);
    const lng = parseFloat(data.longitude);
    const coords = { lat: lat, lng: lng };
    console.log(coords)
    setMapCoords(coords);
    setMapZoom(16);
  }, [])

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} maxWidth="100%" sx={{height: "80%", width: "80%"}}>
      <DialogTitle sx={{ backgroundColor: "whitesmoke", textAlign: "Center" }}>
        {data.branch}, {data.province}, {data.city}, {data.address}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", }} dividers >
        <Maps zoom={mapZoom} center={mapCenter} onSave={(marker) => () => {}} />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClose}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlarmDialog;
