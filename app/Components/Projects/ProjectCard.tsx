import "./ProjectCard.scss";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { MdOutlineZoomOutMap } from "react-icons/md";

interface ProjectCardProps {
    heading: string;
    coverImage: string;
    coverWidth: number;
    coverHeight: number;
    images: string[];
    gitHubLink: string;
    description: string;
    setPopUpShow: (show: boolean) => void;
}

export default function ProjectCard(props: ProjectCardProps) {

    return (
        <div className="projectCard-root">
            <div className="image-container">
                <Image src={props.coverImage} alt="Go Around Cover" className="coverImage" width={props.coverWidth} height={props.coverHeight}></Image>
            </div>
            <div className="project-heading">
                <div>{props.heading}</div>
            </div>
            <div className="project-gitHub-link" onClick={() => window.open(props.gitHubLink, "_blank")}>
                <FaGithub size={30}/>
                <div>View Project</div>
            </div>
            <div className="project-description">
                <div>{props.description}</div>
            </div>
            <MdOutlineZoomOutMap size={30} className="zoomIcon" onClick={() => props.setPopUpShow(true)}/>
        </div>
    )
}