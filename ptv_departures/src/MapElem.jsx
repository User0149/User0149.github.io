import { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, Circle, CircleMarker} from 'react-leaflet'

export default function MapElem({pos, selectedStop, stopsList}) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map) {
            map.setView(pos, 15);
        }
    }, [pos, map]);
    return (
        <div className="width50 height100">
            <MapContainer ref={setMap} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={pos}/>
                <CircleMarker center={pos} pathOptions={{color: "red"}} radius={10}/>
                <Circle center={pos} pathOptions={{color: "green", fillColor: "null", dashArray: "15"}} radius={1000}/>
            </MapContainer>
        </div>
    );
}