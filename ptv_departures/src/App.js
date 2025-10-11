import './App.css';
import {useState} from 'react';

import NearestStopsElem from './NearestStopsElem.js'
import NextDeparturesElem from './NextDeparturesElem.js'
import MapElem from './MapElem.js';
import TopBar from './TopBar.js';


function App() {
    const [selectedStop, setSelectedStop] = useState(null);
    const [devID, setDevID] = useState(localStorage.getItem("dev_id"));
    const [devKey, setDevKey] = useState(localStorage.getItem("dev_key"));

    if (devID == null) {
        localStorage.setItem("dev_id", "");
        setDevID("");
    }
    if (devKey == null) {
        localStorage.setItem("dev_key", "");
        setDevKey("");
    }

    return (
        <>
            <TopBar devID={devID} devKey={devKey} setDevID={setDevID} setDevKey={setDevKey}/>
            <div className="flex" style={{height: "calc(100vh - 30px)"}}>
                <NearestStopsElem selectedStop={selectedStop} setSelectedStop={setSelectedStop} devID={devID} devKey={devKey}/>
                <NextDeparturesElem selectedStop={selectedStop}/>
                <MapElem/>
            </div>
        </>
    );
}

export default App;
