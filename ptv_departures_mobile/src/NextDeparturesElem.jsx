import APIQuery from './api.js'
import {useCallback, useEffect, useState} from 'react';

async function NextDepartures(selectedStop) {
    if (selectedStop == null) return {};

    let route_type = selectedStop.route_type.toString();
    let stop_id = selectedStop.stop_id.toString();
    const response = await APIQuery(`/v3/departures/route_type/${route_type}/stop/${stop_id}?max_results=10&expand=0`);
    if (!response) return {};
    return response;
}

function DepartureItem({selectedStop, departure, destination, setDisruptionIDs, setShowDisruptions}) {
    const scheduled_departure_utc = new Date(departure.scheduled_departure_utc);
    const estimated_departure_utc = (departure.estimated_departure_utc ? new Date(departure.estimated_departure_utc) : null);

    const route_id = departure.route_id;
    const platform_number = departure.platform_number;
    let route_number, route_name = ["", ""];

    const route_type = selectedStop.route_type;

    for (let route of selectedStop.routes) {
        if (route.route_id === route_id) {
            [route_number, route_name] = [route.route_number, route.route_name];
        }
    }

    const scheduled_string = scheduled_departure_utc.toLocaleTimeString("fr-FR").slice(0,5);
    const scheduled_string_extended = (scheduled_departure_utc.toDateString() === (new Date()).toDateString() ? "" : `${scheduled_departure_utc.toDateString().slice(0,3)} `) + scheduled_string;

    const estimated_string = (estimated_departure_utc ? (estimated_departure_utc.getTime() === scheduled_departure_utc.getTime() ? scheduled_string : estimated_departure_utc.toLocaleTimeString("fr-FR")) : scheduled_string);

    return (
        <div className="width100 departure_box flex">
            <div style={{width: "calc(100% - 100px)", marginLeft: "10px"}}>
                <div className="flex">
                    <div className="margin-top-10px" style={{minWidth: "75px", paddingRight: "15px"}}>
                        {scheduled_string_extended}
                    </div>
                    <div className="margin-top-10px">
                        to {destination}
                    </div>
                </div>

                <div style={{fontSize: "small", color: "#555555", marginTop: "5px"}}>
                    {platform_number ? `Platform ${platform_number}` : ""}
                </div>

                <div className="flex" style={{marginTop: "15px", marginBottom: "10px", alignItems: "center"}}>
                    <div className="flex" style={{minWidth: "90px", alignItems: "center"}}>
                        <div className="small_route_button" style={{border: `1.5px solid ${["#008cce","#71be46","#ff8200","#7d4296","#ff8200"][route_type]}`, fontSize: "0.9em"}}>
                            {(route_number ? route_number : route_name)}
                        </div>
                    </div>

                    {departure.disruption_ids.length >= 1 && <img alt="disruption" src="img/exclamation_mark.svg" height="23px" className="clickable" onClick={() => {
                        setDisruptionIDs(departure.disruption_ids);
                        setShowDisruptions(true);
                    }}></img>}
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

function DeparturesListElem({selectedStop, departures, setDisruptionIDs, setShowDisruptions}) {
    if (!selectedStop || !departures.departures || !departures.runs) {
        return (
            <></>
        );
    }
    if (departures.departures.length === 0) {
        return (
            <div className="height100 text-align-center">
                <p>There are no departures from this stop.</p>
            </div>
        );
    }

    const runs = departures.runs;

    return (
        <div className="overflow" style={{height: "calc(100% - 54px)"}}>
            {
                departures.departures.map(departure => {
                    return (
                        <DepartureItem key={departure.run_ref.toString() +","+ selectedStop.stop_id.toString()+","+departure.scheduled_departure_utc} selectedStop={selectedStop} departure={departure} destination={runs[departure.run_ref].destination_name} setDisruptionIDs={setDisruptionIDs} setShowDisruptions={setShowDisruptions}/>
                    );
                })
            }
        </div>
    );
}

export default function NextDeparturesElem({selectedStop, setDisruptionIDs, setDisruptions, setShowDisruptions}) {
    const [departures, setDepartures] = useState({});

    const getDepartures = useCallback(async () => {
        const response = await NextDepartures(selectedStop);
        if (response) {
            setDepartures(response);
            setDisruptions(response.disruptions);
        }
    }, [selectedStop, setDisruptions]);

    useEffect(() => {
        getDepartures();
        const interval = setInterval(getDepartures, 15000);

        return () => clearInterval(interval);
    }, [selectedStop, getDepartures]);

    return (
        <div className="border-right height100" style={{width: "30%"}}>
            <div className="position-relative background-grey font-x-large text-align-center padding-15px font-large">
                <div>Next Departures</div>
                <div id="refresh_icon_box" className="rounded_h flex-center position-absolute" style={{height: "35px", width: "35px", right: "0px", bottom: "0px"}} onClick={getDepartures}>
                    <img alt="update" src="img/refresh.svg" width="20px" height="20px"></img>
                </div>
            </div>
            
            <DeparturesListElem selectedStop={selectedStop} departures={departures} setShowDisruptions={setShowDisruptions} setDisruptionIDs={setDisruptionIDs}/>
        </div>
    );
}