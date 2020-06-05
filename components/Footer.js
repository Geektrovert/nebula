import React from "react";
import {
  FiCoffee as Coffee,
  FiCode as Code,
  FiHeart as Heart,
} from "react-icons/fi";
import Link from "next/link";

const Footer = () => (
  <footer>
    <div className="footer-item">
      <Link href="/uncopyright">
        <a>Uncopyright</a>
      </Link>
    </div>
    <div className="footer-item">
      Made with <Coffee />, <Code /> and <Heart /> by{" "}
      <a href="https://github.com/Geektrovert" target="_blank">
        Geektrovert
      </a>
    </div>
    <div className="footer-item">
      Source code on{" "}
      <a href="https://github.com/YAS-opensource/nebula" target="_blank">
        GitHub
      </a>
    </div>
  </footer>
);

export default Footer;
