import { useState } from "react";

import SpaceY from "./SpaceY";

import SearchBar from "./SearchBar";
import ProjectList from "./ProjectList";
import MainContentContainer from "./MainContentContainer";

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <section id="projects">
            <MainContentContainer>
                <SpaceY spacing={5}>
                    <h2 className="text-center text-4xl">My Projects</h2>
                    <div>
                        <div>Below is a selection of some projects that I have made.</div>
                        <div>More to come soon!</div>
                    </div>

                    <SearchBar setSearchTerm={setSearchTerm} />
                    <ProjectList searchTerm={searchTerm} />
                </SpaceY>
            </MainContentContainer>
        </section>
    );
}
