import type { ProjectType } from "../types/types";
import SpaceY from "./SpaceY";

interface ProjectCardProps {
    project: ProjectType;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="border rounded-xl overflow-hidden pb-5 pop-on-hover">
            <SpaceY spacing={3}>
                <img src={"./assets/"+project.image} className="w-full"/>
                <div className="px-5">
                    <SpaceY spacing={3}>
                        <h3><a className="text-xl underline" href={project.href}>{project.name}</a></h3>
                        <p>{project.description}</p>
                    </SpaceY>
                </div>
            </SpaceY>
        </div>
    );
}