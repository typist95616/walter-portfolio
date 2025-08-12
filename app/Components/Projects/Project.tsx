import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.scss";
import PopUp from "./PopUp";

export default function Projects() {

    const [popUpShow, setPopUpShow] = useState(false);

    useEffect(() => {
        if (popUpShow) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
    }, [popUpShow]);

    return (
        <div className="projects-container " id={"projects"}>
            <div className="projects-root">
                <div className="projects-content">
                    <div className="projects-heading">My Projects</div>
                    <div className="ProjectCard-container">
                        <ProjectCard
                            heading="3D Scanner App"
                            coverImage="/Images/go2.png"
                            coverWidth={100}
                            coverHeight={200}
                            images={[""]}
                            gitHubLink="https://github.com/jackielai1205/ScannerApp"
                            description="This is a description for Scanner App"
                            setPopUpShow={setPopUpShow}
                        />
                        <ProjectCard
                            heading={"8 Bit Dark Souls"}
                            coverImage="/Images/bit1.png"
                            coverWidth={300}
                            coverHeight={300}
                            images={[]}
                            gitHubLink="https://github.com/jackielai1205/8bitDarkSouls"
                            description="This is a description for 8 bit Dark Souls"
                            setPopUpShow={setPopUpShow}
                        />
                    </div>
                </div>``
            </div>
            {popUpShow && (
                <>
                    <div className="popUp-overlay" />
                    <PopUp popUpShow={popUpShow} setPopUpShow={setPopUpShow} />
                </>
            )}
        </div>
    )
}