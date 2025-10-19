import {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Circle, Tooltip} from 'react-leaflet'
import {iconRoute, iconRed} from './Markers.js'

export default function MapElem({pos, selectedStop, setSelectedStop, stopsList}) {
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

                <Marker position={pos} icon={iconRed} zIndexOffset={1000}>
                    <Tooltip>Your location</Tooltip>
                </Marker>
                <Circle center={pos} pathOptions={{color: "green", fill: false, dashArray: "15"}} radius={1000}/>

                {
                    stopsList.map(stop => {
                        return (
                            <Marker 
                            key={stop.stop_id.toString() + stop.route_type.toString() + "_marker"} 
                            position={[stop.stop_latitude, stop.stop_longitude]} 
                            icon={iconRoute(stop.route_type, (stop.stop_id === selectedStop.stop_id && stop.route_type === selectedStop.route_type ? 40 : 30))} 
                            opacity={(stop.stop_id === selectedStop.stop_id && stop.route_type === selectedStop.route_type ? 1.0 : 0.9)} 
                            zIndexOffset={(stop.stop_id === selectedStop.stop_id && stop.route_type === selectedStop.route_type ? 1500 : 0) + (stop.route_type === 0 ? 1 : 0)}
                            eventHandlers={
                                {
                                    mouseover: (e) => document.getElementById(`${stop.route_type},${stop.stop_id}`).style.backgroundColor="#d5d5d5", 
                                    mouseout: (e) => {
                                        if (stop.stop_id === selectedStop.stop_id && stop.route_type === selectedStop.route_type) {
                                            document.getElementById(`${stop.route_type},${stop.stop_id}`).style.backgroundColor = "#d5d5d5";
                                        }
                                        else {
                                            document.getElementById(`${stop.route_type},${stop.stop_id}`).style.removeProperty("background-color");
                                        }
                                    },
                                    click: (e) => {setSelectedStop(stop)}
                                }
                            }>
                                <Tooltip>{stop.stop_name}</Tooltip>
                            </Marker>
                        );
                    })
                }
            </MapContainer>
        </div>
    );
}