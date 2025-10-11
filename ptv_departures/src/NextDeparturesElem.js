import APIQuery from './api.js'
import {useEffect, useState} from 'react';

async function NextDepartures(selectedStop) {
    if (selectedStop == null) return [];

    let route_type = selectedStop.route_type.toString();
    let stop_id = selectedStop.stop_id.toString();
    const response = await APIQuery(`/v3/departures/route_type/${route_type}/stop/${stop_id}`);
    if (!response) return [];
    return response.departures;
}
async function RouteDirections(route_id) {
    const response = await APIQuery(`/v3/directions/route/${route_id}`);
    if (!response || !response.directions) return [];
    const directions_list = response.directions;
    return directions_list;
}

function DepartureItem({selectedStop, departure, RouteDirectionsList}){
    const scheduled_departure_utc = new Date(departure.scheduled_departure_utc);
    const estimated_departure_utc = (departure.estimated_departure_utc ? new Date(departure.estimated_departure_utc) : null);

    const route_id = departure.route_id;
    const direction_id = departure.direction_id;
    const platform_number = departure.platform_number;
    let route_number, route_name, direction_name = ["", "", ""];

    const route_type = selectedStop.route_type;

    for (let route of selectedStop.routes) {
        if (route.route_id === route_id) {
            [route_number, route_name] = [route.route_number, route.route_name];
        }
    }
    if (route_id in RouteDirectionsList) {
        for (const direction of RouteDirectionsList[route_id]) {
            if (direction.direction_id === direction_id){
                direction_name = direction.direction_name;
            }
        }
    }

    const scheduled_string = scheduled_departure_utc.toLocaleTimeString("fr-FR").slice(0,5);
    const estimated_string = (estimated_departure_utc ? (estimated_departure_utc.getTime() === scheduled_departure_utc.getTime() ? scheduled_string : estimated_departure_utc.toLocaleTimeString("fr-FR")) : scheduled_string);

    return (
        <div className="width100 departure_box flex">
            <div style={{width: "calc(100% - 100px)", marginLeft: "10px"}}>
                <div className="flex">
                    <p className="margin-top-10px">
                        {scheduled_string.slice(0,5)}
                    </p>
                    <p className="float-right-10 margin-top-10px" style={{width: "200px", marginLeft: "25px"}}>
                        towards {direction_name}
                    </p>
                </div>

                <div className="small_route_button" style={{border: `1.5px solid ${["#008cce","#71be46","#ff8200","#7d4296","#ff8200"][route_type]}`, fontSize: "0.9em"}}>
                    {(route_number ? route_number : route_name)}
                </div>
                
                <div style={{fontSize: "small", color: "#555555"}}>
                    {platform_number ? `Platform ${platform_number}` : ""}
                </div>
            </div>
            <div className="float-right-10 flex-center">
                <div>
                    {
                        (estimated_string !== scheduled_string ?
                            <p className="text-align-center" style={{color: "gray", fontSize: "small", marginBottom: "2px"}}>live</p>
                            :
                            <p className="text-align-center" style={{color: "gray", fontSize: "small", marginBottom: "2px"}}>scheduled</p>
                        )
                    }
                    <p className="estimated_button" style={{marginTop: "0px", backgroundColor: `${(estimated_string === scheduled_string ? "#ffffa8" : "#aaffaa")}`}}>
                        {estimated_string ? estimated_string : scheduled_string}
                    </p>
                </div>
            </div>
        </div>
    );
}

function DeparturesListElem({selectedStop, departures}){
    const [RouteDirectionsList, setRouteDirectionsList] = useState({});

    useEffect(() => {
        (async () => {
            if (!selectedStop) return;
            
            let ret = {};
            for (let route of selectedStop.routes) {
                if (ret[route.route_id] === undefined) {
                    ret[route.route_id] = await RouteDirections(route.route_id);
                }
            }

            setRouteDirectionsList(ret);
        })();
    }, [selectedStop]);

    if (!selectedStop) {
        return (
            <></>
        );
    }
    if (departures.length === 0) {
        return (
            <div className="height100 text-align-center">
                <p>There are no departures from this stop.</p>
            </div>
        );
    }

    return (
        <div className="overflow" style={{height: "calc(100% - 54px)"}}>
            {
                departures.map(departure => {
                    return (
                        <DepartureItem key={departure.run_ref} selectedStop={selectedStop} departure={departure} RouteDirectionsList={RouteDirectionsList}/>
                    );
                })
            }
        </div>
    );
}

export default function NextDeparturesElem({selectedStop}) {
    const [departures, setDepartures] = useState([]);
    useEffect(() => {
        (async () => {
            const departuresList = await NextDepartures(selectedStop);
            if (departuresList) {
                setDepartures(departuresList.filter(departure => {
                    const scheduled_departure_utc = new Date(departure.scheduled_departure_utc);
                    const estimated_departure_utc = (departure.estimated_departure_utc ? new Date(departure.estimated_departure_utc) : null);

                    return (estimated_departure_utc > new Date() || (estimated_departure_utc == null && scheduled_departure_utc > new Date()));
                }));
            }
        })();
    }, [selectedStop]);

    return (
        <div className="border-right width25 height100">
            <div className="position-relative background-grey font-x-large text-align-center padding15px font-large">
                <div>Next Departures</div>
                <div id="refresh_icon_box" className="rounded_h flex-center position-absolute" style={{height: "35px", width: "35px", right: "0px", bottom: "0px"}} onClick={
                    () => {
                        (async () => {
                            const departuresList = await NextDepartures(selectedStop);
                            if (departuresList) {
                                setDepartures(departuresList.filter(departure => {
                                    const scheduled_departure_utc = new Date(departure.scheduled_departure_utc);
                                    const estimated_departure_utc = (departure.estimated_departure_utc ? new Date(departure.estimated_departure_utc) : null);

                                    return (estimated_departure_utc > new Date() || (estimated_departure_utc == null && scheduled_departure_utc > new Date()));
                                }));
                            }
                        })();
                    }
                }>
                    <img alt="update" src="refresh.svg" width="20px" height="20px"></img>
                </div>
            </div>
            
            <DeparturesListElem selectedStop={selectedStop} departures={departures}/>
        </div>
    );
}