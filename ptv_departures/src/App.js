import './App.css';
import {useState} from 'react';

import NearestStopsElem from './NearestStopsElem.js'
import NextDeparturesElem from './NextDeparturesElem.js'
import MapElem from './MapElem.js';
import TopBar from './TopBar.js';


function App() {
    const [selectedStop, setSelectedStop] = useState(null);

    return (
        <>
            <TopBar/>
            <div className="flex" style={{height: "calc(100vh - 30px)"}}>
                <NearestStopsElem selectedStop={selectedStop} setSelectedStop={setSelectedStop}/>
                <NextDeparturesElem selectedStop={selectedStop}/>
                <MapElem/>
            </div>
        </>
    );
}

export default App;
