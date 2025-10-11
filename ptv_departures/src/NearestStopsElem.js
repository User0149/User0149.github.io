import APIQuery from './api.js'
import {useState} from 'react';

async function NearestStops() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, () => alert("Could not get location."));
    });

    let lat = pos.coords.latitude.toString();
    let long = pos.coords.longitude.toString();
    lat = -37.818078;
    long = 144.96681;

    const ret = await APIQuery(`/v3/stops/location/${lat},${long}?max_distance=1000`);
    return ret;
}

function StopItem({selectedStop, setSelectedStop, stop}){
    return (
        <div className="width100 stop_box flex" key={[stop.stop_id.toString(),stop.route_type.toString()].toString()} style={(stop === selectedStop ? {backgroundColor: "#d5d5d5"} : {})} onClick={() => setSelectedStop(stop)}>
            <img src={`route_type_${stop.route_type.toString()}.svg`} alt={`route_type_${stop.route_type.toString()}.svg`} width="40px" style={{padding: "15px"}}/>

            <div className="width100 height100" style={{fontSize: "0.9em"}}>
                <div className="flex width100" style={{height: "50px"}}>
                    <p className="margin-top-10px bold" style={{width: "calc(100% - 55px)"}}>{stop.stop_name}</p>
                    <p className="margin-top-10px" style={{marginLeft: "auto", marginRight: "10px"}}>{Math.round(stop.stop_distance)} m</p>
                </div>
                
                <div className="flex" style={{height: "calc(100% - 55px"}}>
                    <div className="overflow" style={{width: "calc(100% - 40px)"}}>
                        {
                            stop.routes.map(route => {
                                const colour=["#008cce","#71be46","#ff8200","#7d4296","#ff8200"];
                                return (
                                    <span key={`${[stop.stop_id.toString(), route.route_name.toString()].toString()}`} className="small_route_button" style={{border: `1.5px solid ${colour[route.route_type]}`}}>
                                        {(route.route_number ? route.route_number : route.route_name)}
                                    </span>
                                );
                            })
                        }
                    </div>
                    <img src="right-arrow.svg" alt="right-arrow" style={{marginTop: "10px", marginLeft: "auto", marginRight: "10px"}} height="16px"></img>
                </div>
            </div>
        </div>
    );
}

function StopsListElem({selectedStop, setSelectedStop, devID, devKey}){
    let [stopsList, setStopsList] = useState(null); 

    const getLocation = async () => {
        let API_ret = await NearestStops();
        if (!API_ret) {
            alert("Something went wrong.");
        }

        setStopsList(API_ret.stops);
        if (API_ret.stops.length >= 1) {
            setSelectedStop(API_ret.stops[0]);
        }
    };

    if (devID == null || devID === "" || devKey == null|| devKey === "") {
        return (
            <p className="text-align-center font-x-large font-red">Please configure your PTV developer ID and key in the settings.</p>
        );
    }

    if (stopsList == null) {
        return (
            <div className="clickable stop_box padding15px" onClick={getLocation}>
                <p className="text-align-center font-x-large">Click here to enable location permissions.</p>
            </div>
        );
    }

    if (stopsList.length === 0) {
        return (
            <div className="height100 text-align-center">
                <p>There are no stops within 1000 metres of your location.</p>
            </div>
        );
    }
    return (
        <div className="overflow" style={{height: "calc(100% - 54px)"}}>
            {stopsList.map(stop =>
                <StopItem key={stop.stop_id.toString() + stop.route_type.toString()} selectedStop={selectedStop} setSelectedStop={setSelectedStop} stop={stop}/>
            )}
        </div>
    );
}

export default function NearestStopsElem({selectedStop, setSelectedStop, devID, devKey}) {
    return (
        <div className="border-right width25 height100">
            <div className="background-grey font-x-large text-align-center padding15px font-large">Stops within 1000 metres</div>
            <StopsListElem selectedStop={selectedStop} setSelectedStop={setSelectedStop} devID={devID} devKey={devKey}/>
        </div>
    );
}