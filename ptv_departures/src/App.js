import './App.css';
import {useState} from 'react';

import NearestStopsElem from './nearest_stops.js'
import NextDeparturesElem from './next_departures.js'
import MapElem from './map.js';


function App() {
    const [selectedStop, setSelectedStop] = useState(null);

    return (
        <div className="flex height100vh">
            <NearestStopsElem selectedStop={selectedStop} setSelectedStop={setSelectedStop}/>
            <NextDeparturesElem selectedStop={selectedStop}/>
            <MapElem/>
        </div>
    );
}

export default App;
