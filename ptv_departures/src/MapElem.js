import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

export default function MapElem({pos, selectedStop, stopsList}) {
    // const [lat, long] = pos;
    // console.log(pos);
    return (
        <div className="width50 height100">
            <MapContainer center={pos} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={pos}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}