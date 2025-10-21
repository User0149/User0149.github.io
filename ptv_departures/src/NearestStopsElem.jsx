function StopItem({selectedStop, setSelectedStop, stop}) {
    return (
        <div id={`${stop.route_type},${stop.stop_id}`} className="width100 stop_box flex" style={((stop.stop_id === selectedStop.stop_id && stop.route_type === selectedStop.route_type)? {backgroundColor: "#d5d5d5"} : {})} onClick={() => setSelectedStop(stop)}>
            <img src={`img/route_type_${stop.route_type.toString()}.svg`} alt={`img/route_type_${stop.route_type.toString()}.svg`} width="40px" style={{padding: "15px"}}/>

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
                                    <span key={stop.stop_id.toString() + "," + route.route_id.toString() + "," + stop.route_type.toString() + "," + route.route_type.toString()} className="small_route_button" style={{border: `1.5px solid ${colour[route.route_type]}`, marginBottom: "5px"}}>
                                        {(route.route_number ? route.route_number : route.route_name)}
                                    </span>
                                );
                            })
                        }
                    </div>
                    <img src="img/right-arrow.svg" alt="right-arrow" style={{marginTop: "10px", marginLeft: "auto", marginRight: "10px"}} height="16px"></img>
                </div>
            </div>
        </div>
    );
}

function StopsListElem({stopsList, selectedStop, setSelectedStop, devID, devKey}) {
    if (devID == null || devID === "" || devKey == null|| devKey === "") {
        return (
            <p className="text-align-center font-x-large font-red">Please configure your PTV developer ID and key in the settings.</p>
        );
    }

    if (stopsList == null) {
        return (
            <div className="height100 text-align-center">
                <p>Loading…</p>
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

export default function NearestStopsElem({selectedStop, setSelectedStop, stopsList, getLocationAndStops, devID, devKey}) {
    return (
        <div className="border-right height100" style={{width: "30%"}}>
            <div className="position-relative background-grey font-x-large text-align-center padding-15px font-large">
                <div>Stops within 1000 metres</div>
                <div id="refresh_icon_box" className="rounded_h flex-center position-absolute" style={{height: "35px", width: "35px", right: "0px", bottom: "0px"}} onClick={getLocationAndStops}>
                    <img alt="update" src="img/refresh.svg" width="20px" height="20px"></img>
                </div>
            </div>

            <StopsListElem stopsList={stopsList} selectedStop={selectedStop} setSelectedStop={setSelectedStop} devID={devID} devKey={devKey}/>
        </div>
    );
}