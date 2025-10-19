import L from 'leaflet';

const iconRed= new L.Icon({
    iconUrl: "markers/red-marker.png",
    iconRetinaUrl: "markers/red-marker.png",
    popupAnchor:  [-0, -0],
    iconSize: [20,35]
});

function iconRoute(type, sz) {
    return new L.Icon({
        iconUrl: `markers/route_type_${type}.svg`,
        iconRetinaUrl: `markers/route_type_${type}.svg`,
        popupAnchor:  [-0, -0],
        iconSize: [sz, sz]
    });
}

export {iconRoute, iconRed}