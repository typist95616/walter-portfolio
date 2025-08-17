import { useEffect, useState } from "react";
import "./ThemeSwitch.scss";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";

interface ThemeSwitchProps {
    theme: "light" | "dark" | null;
    onToggle: () => void;
}

export default function ThemeSwitch(props: ThemeSwitchProps) {

    return (
        <div className={`themeSwitch-root ${props.theme}`} onClick={props.onToggle}>
            <FiSun size={20} className="light-icon"/>
            <FaMoon size={20} className="dark-icon"/>
            <div className="switch-ball"></div>
        </div>
    )
}