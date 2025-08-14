"use client";

import "./main.scss";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import SkillSets from "./Components/SkillSets/SkillSets";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import { useEffect } from "react";

export default function Main() {

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement("span");
      ripple.className = "global-ripple";
      const size = 20;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - size / 2}px`;
      ripple.style.top = `${e.clientY - size / 2}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="main-root">
      <NavBar></NavBar>
      <div className="content">
        <Home></Home>
        <About></About>
        <SkillSets></SkillSets>
        <Projects></Projects>
        <Contact></Contact>
      </div>
    </div>
  );
}
