import projects from "./assets/projectList.json";
import ProjectCard from "./ProjectCard";

export default function ProjectList({searchTerm}: {searchTerm: string}) {
    return (
        <div className="grid grid-cols-3 gap-5">
            {
                projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((project) => <ProjectCard key={project.name} project={project}/>)
            }
        </div>
    );
}