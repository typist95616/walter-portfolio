import "./SideBar.scss";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { GrLinkTop } from "react-icons/gr";

export default function SideBar() {

    return (
        <div className="sideBar-root">
            <a href="#home">
                <GrLinkTop size={40}></GrLinkTop>
            </a>
            <FaLinkedin size={40} onClick={() => window.open("https://www.linkedin.com/in/walter-siu-1095281a5/")} className="icon"></FaLinkedin>
            <FaSquareGithub size={40} onClick={() => window.open("https://github.com/typist95616")} className="icon"></FaSquareGithub>
        </div>
    )
}