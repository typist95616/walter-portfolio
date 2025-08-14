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

    const scannerImages = [
        "../Images/go1.png",
        "../Images/go2.png",
        "../Images/go3.png",
        "../Images/go4.png",
        "../Images/go5.png",
        "../Images/go6.png",
    ]

    const darkSoulsImages = [
        "../Images/bit1.png",
        "../Images/bit2.png",
        "../Images/bit3.png",
        "../Images/bit4.png",
    ]

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
                            images={scannerImages}
                            imagesWidth={100}
                            imagesHeight={200}
                            gitHubLink="https://github.com/jackielai1205/ScannerApp"
                            description="A 3D scanner app on IOS made by Swift. This app allows user to import 3D models to interact with, also let users to scan their own object with phone's camera and convert to 3D model."
                            setPopUpShow={setPopUpShow}
                        />
                        <ProjectCard
                            heading={"8 Bit Dark Souls"}
                            coverImage="/Images/bit1.png"
                            coverWidth={300}
                            coverHeight={300}
                            images={darkSoulsImages}
                            imagesWidth={200}
                            imagesHeight={150}
                            gitHubLink="https://github.com/jackielai1205/8bitDarkSouls"
                            description="2D horizontal action game on PC made by C#. "
                            setPopUpShow={setPopUpShow}
                        />
                    </div>
                </div>
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