import { useState } from "react";
import SearchBar from "./SearchBar";
import ProjectList from "./ProjectList";

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <section>
            <div className="content-container space-y-10">
                <div  className="space-y-5">
                    <h2 className="text-center text-4xl">My Projects</h2>
                    <div>
                        <div>Below is a selection of some projects that I have made.</div>
                        <div>More to come soon!</div>
                    </div>
                </div>

                <SearchBar setSearchTerm={setSearchTerm} />
                <ProjectList searchTerm={searchTerm} />
            </div>
        </section>
    );
}