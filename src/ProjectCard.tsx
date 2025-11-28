import type { projectType } from "./types";

export default function ProjectCard({project}: {project: projectType}) {
    return (
        <div className="project-card space-y-3">
            <img src={"./src/assets/"+project.image} className="w-full"/>
            <div className="content-container-small space-y-3">
                <h3><a className="text-xl underline" href={project.href}>{project.name}</a></h3>
                <p>{project.description}</p>
            </div>
        </div>
    );
}