import {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Circle, CircleMarker} from 'react-leaflet'

export default function MapElem({pos, selectedStop, stopsList}) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map && (map.getCenter().lat !== pos[0] || map.getCenter().lng !== pos[1])) {
            map.setView(pos, 15);
        }
    }, [pos, map]);
    
    if (!stopsList && !selectedStop) {
        return (
            <div className="width50 height100">
                <MapContainer center={[-37.8136,144.9631]} zoom={15} scrollWheelZoom={true} ref={setMap} style={{width: "100%", height: "100%"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        );
    }

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

                {
                    stopsList.map(stop => {
                        return (
                            <Marker key={stop.stop_id.toString() + stop.route_type.toString() + "_marker"} position={[stop.stop_latitude, stop.stop_longitude]}/>
                        );
                    })
                }
                {
                    <CircleMarker center={[selectedStop.stop_latitude, selectedStop.stop_longitude]} pathOptions={{color: "green"}} radius={7}/>
                }
            </MapContainer>
        </div>
    );
}