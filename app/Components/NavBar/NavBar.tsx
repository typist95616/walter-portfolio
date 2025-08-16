"use client";

import { useEffect, useState } from "react";
import "./NavBar.scss";
import ThemeSwitch from "./ThemeSwitch";
import { SiCodingninjas } from "react-icons/si";

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
                <SiCodingninjas size={40}></SiCodingninjas>
            </div>
            <div className="navBar-right">
                <div className="container">
                    <a href="#home">Home</a>
                </div>
                <div className="container">
                    <a href="#about">About</a>
                </div>
                <div className="container">
                    <a href="#skillSets">Skills</a>
                </div>
                <div className="container">
                    <a href="#projects">Projects</a>
                </div>
                <div className="container">
                    <a href="#contact">Contact</a>
                </div>
                <ThemeSwitch onClick={toggleTheme} />
            </div>
        </div>
    )
}