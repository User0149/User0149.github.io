import {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Circle, CircleMarker} from 'react-leaflet'

export default function MapElem({pos, selectedStop, stopsList}) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map && (map.getCenter().lat !== pos[0] || map.getCenter().lng !== pos[1])) {
            map.flyTo(pos, 15, {duration: 1});
        }
    }, [pos, map]);
    return (
        <div className="width50 height100">
            <MapContainer center={[-37.8136,144.9631]} zoom={15} scrollWheelZoom={true} ref={setMap} style={{width: "100%", height: "100%"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={pos}/>
                <CircleMarker center={pos} pathOptions={{color: "red"}} radius={10}/>
                <Circle center={pos} pathOptions={{color: "green", fill: false, dashArray: "15"}} radius={1000}/>
            </MapContainer>
        </div>
    );
}