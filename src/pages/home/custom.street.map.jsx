import { MapContainer, TileLayer, Marker, useMap, Map } from 'react-leaflet';
import './home.css';


const CustomStreetMap = () => {
    const position = [45.7553021, 16.0926];

    return (
            <MapContainer center={[45.7553021, 16.0926]} zoom={13} >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position} hover="petina bato">
                </Marker>
            </MapContainer>
    );
}


export { CustomStreetMap };