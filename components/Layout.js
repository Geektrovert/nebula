import React, { useState, useEffect } from "react";
import { RiMoonClearLine as Moon } from "react-icons/ri";
import { FiSun as Sun } from "react-icons/fi";
import Link from "next/link";

function Layout({ children, isHomepage, secondaryPage, noHead = false }) {
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

  const containerProps = {
    ...(isHomepage && { md: 12 }),
    ...(!isHomepage && { md: 8, mdOffset: 2 }),
  };

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

      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default Layout;
