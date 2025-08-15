"use client";

import "./main.scss";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import SkillSets from "./Components/SkillSets/SkillSets";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import { useEffect, useState } from "react";

export default function Main() {

  const [showDropDown, setShowDropDown] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const triggerDropDown = () => {
    setShowDropDown(true);
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => setShowDropDown(false), 3000);
  }

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
      {showDropDown && (
        <div className={`dropDownMessage${fadeOut ? " fadeout" : ""}`}>
          <div className="dropDownMessage-text">Email sent~</div>
        </div>
      )}
      <NavBar></NavBar>
      <div className="content">
        <Home></Home>
        <About></About>
        <SkillSets></SkillSets>
        <Projects></Projects>
        <Contact triggerDropDown={triggerDropDown}></Contact>
      </div>
    </div>
  );
}
