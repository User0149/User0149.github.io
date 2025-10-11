import {useEffect, useState} from 'react';

export default function TopBar({devID, devKey, setDevID, setDevKey}){
    let [curTime, setCurTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        setInterval(() => {
            setCurTime(new Date().toLocaleTimeString());
        }, 100);
    }, []);

    return (
        <>
            <div className="top-bar flex-center white-text position-relative">
                <div className="center">Current time: {curTime}</div>
            </div>
            <div id="settings_elem_box" className="z-index-1 white-text position-fixed-right" style={{width: "200px", top: "0px"}}>
                <div id="settings_icon_box" className="flex-center" style={{height: "30px", width: "25px", marginLeft: "auto", marginRight: "15px"}}>
                    <img src="settings.svg" alt="settings" height="15px"/>
                </div>
                <div id="settings_elem" className="z-index-1 black-background padding15px">
                    <div>Developer ID</div>
                    <input id="dev_id_input" type="text" value={devID} onInput={() => {localStorage.setItem("dev_id", document.getElementById("dev_id_input").value); setDevID(localStorage.getItem("dev_id"))}}></input>
                    <div>Developer key</div>
                    <input id="dev_key_input" type="text" value={devKey} onInput={() => {localStorage.setItem("dev_key", document.getElementById("dev_key_input").value); setDevKey(localStorage.getItem("dev_key"))}}></input>
                </div>
            </div>
        </>
    );
}