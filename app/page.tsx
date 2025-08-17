"use client";

import "./main.scss";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import SkillSets from "./Components/SkillSets/SkillSets";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import { useEffect, useState } from "react";
import SideBar from "./Components/SideBar";
import { motion, AnimatePresence } from "framer-motion";

export default function Main() {

  const [showDropDown, setShowDropDown] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);

  useEffect(() => {
    // 1s loading，然後開始 fadeout
    const fadeTimer = setTimeout(() => setLoadingFadeOut(true), 1500);
    // 0.5s 之後才真正 unmount loading page
    const hideTimer = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

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
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-page"
            initial={{ clipPath: "circle(100% at 50% 50%)", opacity: 1 }}
            animate={{ clipPath: "circle(100% at 50% 50%)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 50% 50%)", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            <div className="loading-page">
              <div className="loading-page-text">
                {"<span>WalterSiu...</span>".split("").map((char, i) => (
                  <span className="loading-char" style={{ animationDelay: `${i * 0.08}s` }} key={i}>
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="main-root">
        {showDropDown && (
          <div className={`dropDownMessage${fadeOut ? " fadeout" : ""}`}>
            <div className="dropDownMessage-text">Form sent~ </div>
          </div>
        )}
        <NavBar theme={theme} setTheme={setTheme}></NavBar>
        <div className="content">
          <Home></Home>
          <About></About>
          <SkillSets></SkillSets>
          <Projects></Projects>
          <Contact triggerDropDown={triggerDropDown}></Contact>
        </div>
        <SideBar></SideBar>
      </div>
    </>
  );
}
