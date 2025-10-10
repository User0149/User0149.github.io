import {useEffect, useState} from 'react';

export default function TopBar(){
    let [curTime, setCurTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        setInterval(() => {
            setCurTime(new Date().toLocaleTimeString());
        }, 100);
    }, []);

    return (
        <div className="top-bar flex-center white-text position-relative">
            <div className="center">Current time: {curTime}</div>
            <div id="settings_box" className="position-absolute flex-center" style={{height: "100%", width: "25px", right: "15px"}}>
                <img src="settings.svg" alt="settings" height="15px"/>
            </div>
        </div>
    );
}