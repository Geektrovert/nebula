import React, { useState, useEffect } from "react";
import { RiMoonClearLine as Moon } from "react-icons/ri";
import {
  FiSun as Sun,
  FiCoffee as Coffee,
  FiCode as Code,
  FiHeart as Heart,
  FiGithub as GH,
} from "react-icons/fi";
import Link from "next/link";

function Layout({ children }) {
  const onLoadTheme =
    typeof localStorage !== "undefined" && localStorage.getItem("BLOG_THEME");
  const [theme, setTheme] = useState(onLoadTheme);
  const [mounted, setMounted] = useState(false);
  const switchTheme = () => {
    const setTo = theme === "dark" ? "light" : "dark";

    setTheme(setTo);
  };

  useEffect(() => {
    if (onLoadTheme) return;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("BLOG_THEME", theme);

    setMounted(true);
  }, [theme]);

  if (!mounted) return <div />;

  return (
    <>
      <div className="top-menu">
        <Link href="/" as="/">
          <div className="logo">Nebula</div>
        </Link>

        <button className="theme-switch-button" onClick={() => switchTheme()}>
          {theme === "dark" ? (
            <Sun className="icon" />
          ) : (
            <Moon className="icon" />
          )}
        </button>
      </div>

      <div className="content">{children}</div>

      <footer>
        <Link href="/">Uncopyright</Link>
        {" | "}
        Made with <Coffee />, <Code /> and <Heart /> by{" "}
        <a href="https://github.com/Geektrovert" target="_blank">
          Geektrovert
        </a>
        {" | "}
        Source code on{" "}
        <a href="https://github.com/Geektrovert/nebula" target="_blank">
          <GH />
        </a>
      </footer>
    </>
  );
}

export default Layout;
