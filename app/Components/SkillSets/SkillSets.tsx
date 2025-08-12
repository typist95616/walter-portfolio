import "./SkillSets.scss";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { SiPrisma } from "react-icons/si";
import { FaSwift } from "react-icons/fa";

export default function SkillSets() {

    return (
        <div className="skillSets-container" id={"skillSets"}>
            <div className="skillSets-root">
                <div className="skills-content">
                    <div className="skillSets-heading">
                        Skill Sets
                    </div>
                    <div className="skills-container">
                        <div className="skills-firstLine">
                            <RiJavascriptFill size={80} />
                            <BiLogoTypescript size={80} />
                            <FaReact size={80} />
                            <FaGithub size={80} />
                        </div>
                        <div className="skills-secondLine">
                            <FaHtml5 size={80} />
                            <IoLogoCss3 size={80} />
                            <SiPrisma size={80} />
                            <FaSwift size={80} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}