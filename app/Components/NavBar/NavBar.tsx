"use client";

import { useEffect, useState } from "react";
import "./NavBar.scss";
import ThemeSwitch from "./ThemeSwitch";

export default function NavBar() {

    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className="navBar-root">
            <div className="navBar-left">
                <div>Logo</div>
            </div>
            <div className="navBar-right">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#skillSets">Skill Sets</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
                <ThemeSwitch onClick={toggleTheme} />
            </div>
        </div>
    )
}