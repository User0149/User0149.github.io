import './App.css';
import {useState} from 'react';

import NearestStopsElem from './NearestStopsElem.js'
import NextDeparturesElem from './NextDeparturesElem.js'
import MapElem from './MapElem.js';
import TopBar from './TopBar.js';
import APIQuery from './api.js'

async function NearestStops(lat, long) {
    const ret = await APIQuery(`/v3/stops/location/${lat},${long}?max_distance=1000`);
    return ret;
}

function App() {
    const [devID, setDevID] = useState(localStorage.getItem("dev_id"));
    const [devKey, setDevKey] = useState(localStorage.getItem("dev_key"));
    const [selectedStop, setSelectedStop] = useState(null);
    const [stopsList, setStopsList] = useState(null);
    const [pos, setPos] = useState([0, 0]);

    if (devID == null) {
        localStorage.setItem("dev_id", "");
        setDevID("");
    }
    if (devKey == null) {
        localStorage.setItem("dev_key", "");
        setDevKey("");
    }
    
    const getLocation = async () => {
        const cur_pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, () => alert("Could not get location."));
        });

        const [lat, long] = [cur_pos.coords.latitude, cur_pos.coords.longitude];
        setPos([lat, long]);
        // console.log(pos);
        // setLat("-37.8177");
        // setLong("144.9514");

        let API_ret = await NearestStops(lat, long);
        if (!API_ret) {
            console.log("Something went wrong.");
        }

        setStopsList(API_ret.stops);
        if (API_ret.stops.length >= 1) {
            setSelectedStop(API_ret.stops[0]);
        }
    };

    if (selectedStop == null) getLocation();

    return (
        <>
            <TopBar devID={devID} devKey={devKey} setDevID={setDevID} setDevKey={setDevKey}/>
            <div className="flex" style={{height: "calc(100vh - 30px)"}}>
                <NearestStopsElem selectedStop={selectedStop} setSelectedStop={setSelectedStop} getLocation={getLocation} stopsList={stopsList} devID={devID} devKey={devKey}/>
                <NextDeparturesElem selectedStop={selectedStop}/>
                <MapElem pos={pos} selectedStop={selectedStop} stopsList={stopsList}/>
            </div>
        </>
    );
}

export default App;
