import './style.css';
import {useEffect, useState, useCallback} from 'react';

import NearestStopsElem from './NearestStopsElem.jsx'
import NextDeparturesElem from './NextDeparturesElem.jsx'
import MapElem from './MapElem.jsx';
import TopBar from './TopBar.jsx';
import APIQuery from './api.js'
import Disruption from './Disruption.jsx';

async function NearestStops(lat, long) {
    const ret = await APIQuery(`/v3/stops/location/${lat},${long}?max_distance=1000&max_results=1000`);
    return ret;
}

function App() {
    const [devID, setDevID] = useState(localStorage.getItem("dev_id"));
    const [devKey, setDevKey] = useState(localStorage.getItem("dev_key"));
    const [selectedStop, setSelectedStop] = useState(null);
    const [stopsList, setStopsList] = useState(null);
    const [pos, setPos] = useState([0, 0]);
    const [disruptionIDs, setDisruptionIDs] = useState([]);
    const [disruptions, setDisruptions] = useState({});
    const [showDisruptions, setShowDisruptions] = useState(false);

    if (devID == null) {
        localStorage.setItem("dev_id", "");
        setDevID("");
    }
    if (devKey == null) {
        localStorage.setItem("dev_key", "");
        setDevKey("");
    }

    const getStops = useCallback(async (lat, long) => {
        let API_ret = await NearestStops(lat, long);
        if (!API_ret) {
            console.log("Something went wrong.");
        }
 
        setStopsList(API_ret.stops);
        if (API_ret.stops.length >= 1 && !selectedStop) {
            setSelectedStop(API_ret.stops[0]);
        }
    }, [selectedStop]);
    
    const getLocation = useCallback(async () => {
        const cur_pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, () => console.log("Could not get location."));
        });

        const [lat, long] = [Math.round(cur_pos.coords.latitude*1e6)/1e6, Math.round(cur_pos.coords.longitude*1e6)/1e6];
        // const [lat, long] = [-37.8177, 144.9614];
        setPos([lat, long]);
        return [lat, long];
    }, []);

    const getLocationAndStops = useCallback(async () => {
        const [lat, long] = await getLocation();
        getStops(lat, long);
    }, [getLocation, getStops]);

    useEffect(() => {
        getLocationAndStops();
        const interval = setInterval(getLocationAndStops, 15000);
        return () => clearInterval(interval);
    }, [getLocationAndStops]);

    return (
        <>
            <TopBar devID={devID} devKey={devKey} setDevID={setDevID} setDevKey={setDevKey}/>
            <div className="flex" style={{height: "calc(100vh - 30px)"}}>
                <NearestStopsElem selectedStop={selectedStop} setSelectedStop={setSelectedStop} getLocationAndStops={getLocationAndStops} stopsList={stopsList} devID={devID} devKey={devKey}/>
                <NextDeparturesElem selectedStop={selectedStop} setShowDisruptions={setShowDisruptions} setDisruptionIDs={setDisruptionIDs} setDisruptions={setDisruptions}/>
                <MapElem pos={pos} selectedStop={selectedStop} setSelectedStop={setSelectedStop} stopsList={stopsList}/>
            </div>

            <Disruption disruptionIDs={disruptionIDs} disruptions={disruptions} showDisruptions={showDisruptions} setShowDisruptions={setShowDisruptions}/>
        </>
    );
}

export default App;
