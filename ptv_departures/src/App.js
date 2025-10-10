import './App.css';
import {useState} from 'react';

import NearestStopsElem from './nearest_stops.js'
import NextDeparturesElem from './next_departures.js'
import MapElem from './map.js';


function App() {
    const [selectedStop, setSelectedStop] = useState(null);

    return (
        <>
            <div className="top-bar">

            </div>
            <div className="flex" style={{height: "calc(100vh - 30px)"}}>
                <NearestStopsElem selectedStop={selectedStop} setSelectedStop={setSelectedStop}/>
                <NextDeparturesElem selectedStop={selectedStop}/>
                <MapElem/>
            </div>
        </>
    );
}

export default App;
