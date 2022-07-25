import {GoogleMap, useLoadScript, Marker, HeatmapLayer, Circle, InfoWindow} from "@react-google-maps/api";
import {Box} from "@mui/material";
import Geocode from "react-geocode";
import {useEffect, useState} from "react";
import useApi from "../hooks/useApi";

const {REACT_APP_MAPS_API_KEY} = process.env;
Geocode.setApiKey(REACT_APP_MAPS_API_KEY);

export default function Maps() {

    const api = useApi('/branches')

    const [data, setData] = useState([])
    const center = {
        lat: -3.745,
        lng: -38.523
    }
    const mapStyle = {
        width: "100vw",
        height: "100vh",
    }
    const divStyle = {
        background: `white`,
        border: `1px solid #ccc`,
    }

    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 2000,
        zIndex: 1
    }
    const initCoords = {lat: -0.1824739406812052, lng: -78.46213540619937};

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: REACT_APP_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <>

            <Box className="container">


                <GoogleMap
                    zoom={6}
                    center={initCoords}
                    mapContainerStyle={mapStyle}
                >
                    {api.data.map(b => (
                        <>
                            <Circle
                                center={{
                                    lat: parseFloat(b.latitude),
                                    lng: parseFloat(b.longitude)
                                }}
                                options={options}/>
                            <Marker
                                position={{
                                    lat: parseFloat(b.latitude),
                                    lng: parseFloat(b.longitude)
                                }}/>
                            <InfoWindow
                                position={{
                                    lat: parseFloat(b.latitude),
                                    lng: parseFloat(b.longitude)
                                }}
                            >
                                <div style={divStyle}>
                                    <h1>{b.name}</h1>
                                </div>
                            </InfoWindow>
                        </>

                    ))}


                </GoogleMap>

            </Box>
        </>
    );
}
//{api.data.map( branch => (
//              <Marker position={{lat: parseFloat(branch.latitude), lng: parseFloat(branch.longitude)}} label={branch.name} />
//          ))}