import "./SkillSets.scss";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { FaReact, FaGithub, FaHtml5, FaSwift } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { SiPrisma } from "react-icons/si";
import { motion } from "framer-motion";

// 動畫設定
import type { Variants, TargetAndTransition } from "framer-motion";
const iconVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: (custom: number = 0): TargetAndTransition => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.1,
            duration: 0.3,
            type: "spring" as const
        }
    })
};

export default function SkillSets() {
    const iconsRow1 = [
        <RiJavascriptFill size={80} key="js" />, 
        <BiLogoTypescript size={80} key="ts" />, 
        <FaReact size={80} key="react" />, 
        <FaGithub size={80} key="github" />
    ];
    const iconsRow2 = [
        <FaHtml5 size={80} key="html" />, 
        <IoLogoCss3 size={80} key="css" />, 
        <SiPrisma size={80} key="prisma" />, 
        <FaSwift size={80} key="swift" />
    ];

    return (
        <div className="skillSets-container" id="skillSets">
            <div className="skillSets-root">
                <div className="skills-content">
                    <div className="skillSets-heading">My Stack</div>
                    <div className="skills-container">
                        <div className="skills-firstLine">
                            {iconsRow1.map((icon, idx) => (
                                <motion.span
                                    className="skill-icon"
                                    key={idx}
                                    custom={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.3 }}
                                    variants={iconVariants}
                                >
                                    {icon}
                                </motion.span>
                            ))}
                        </div>
                        <div className="skills-secondLine">
                            {iconsRow2.map((icon, idx) => (
                                <motion.span
                                    className="skill-icon"
                                    key={idx}
                                    custom={idx+4}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.3 }}
                                    variants={iconVariants}
                                >
                                    {icon}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}