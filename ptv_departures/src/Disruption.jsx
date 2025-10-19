export default function Disruption({disruptionIDs, disruptions, showDisruptions, setShowDisruptions}) {
    if (!showDisruptions) return <></>;
    
    return (
        <div id="modal_background" className="modal flex-center" onClick={(e) => {
            if (e.target == document.getElementById("modal_background")) {
                setShowDisruptions(false);
            }
        }}>
            <div className="modal_box padding15px">
                <span className="modal_close_button clickable" onClick={() => {setShowDisruptions(false)}}>&times;</span>
                {
                    disruptionIDs.map(id => 
                        <div key={id}>
                            <p className="bold">{disruptions[id].title}</p>
                            <p>{disruptions[id].description}</p>
                            <a href={disruptions[id].url} target="_blank">More Information</a>
                            <hr/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}