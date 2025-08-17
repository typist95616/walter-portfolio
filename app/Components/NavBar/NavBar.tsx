"use client";

import { useEffect, useState } from "react";
import "./NavBar.scss";
import ThemeSwitch from "./ThemeSwitch";
import { SiCodingninjas } from "react-icons/si";

interface NavBarProps {
    theme: "light" | "dark" | null;
    setTheme: (theme: "light" | "dark") => void;
}

export default function NavBar({ theme, setTheme }: NavBarProps) {

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? "dark" : "light");
            }
        };
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        localStorage.setItem("theme", theme === "light" ? "dark" : "light");
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
                <ThemeSwitch theme={theme} onToggle={toggleTheme} />
            </div>
        </div>
    )
}