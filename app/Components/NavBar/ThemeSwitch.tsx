import { useEffect, useState } from "react";
import "./ThemeSwitch.scss";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";

interface ThemeSwitchProps {
    onClick?: () => void;
}

export default function ThemeSwitch(props: ThemeSwitchProps) {

    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <div className={`themeSwitch-root ${theme}`} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <FiSun size={20} className="light-icon"/>
            <FaMoon size={20} className="dark-icon"/>
            <div className="switch-ball"></div>
        </div>
    )
}