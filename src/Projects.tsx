import { useState } from "react";
import SearchBar from "./SearchBar";
import ProjectList from "./ProjectList";

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <section className="pb-10">
            <div className="content-container">
                <h2 className="pt-10 text-center text-4xl">My Projects</h2>
                <div className="mt-5">Below is a selection of some projects that I have made.<br/>More to come soon!</div>

                <br/>

                <SearchBar setSearchTerm={setSearchTerm} />
                <ProjectList searchTerm={searchTerm} />
            </div>
        </section>
    );
}