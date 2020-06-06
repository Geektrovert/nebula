import React from "react";
import Link from "next/link";

import Layout from "./Layout";

const ErrorLayout = ({ title, image, description }) => (
  <Layout>
    <div className="error-page">
      <h1 className="error-title">{title}</h1>

      <p className="error-description">
        {description}
        <br />
        You can go back to{" "}
        <Link href="/">
          <a>home page</a>
        </Link>
        !
      </p>

      {image && (
        <img
          className="error-img"
          src={image.src}
          alt={image.alt ? image.alt : "error image"}
        />
      )}
    </div>
  </Layout>
);

export default ErrorLayout;
