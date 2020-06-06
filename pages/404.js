import React from "react";

import ErrorLayout from "../components/Error";

const Error = () => {
  const err404 = { src: "/images/alien.svg", alt: "lost in space" };

  return (
    <ErrorLayout
      title="Oh no, this page was taken away by the aliens!"
      image={err404}
    />
  );
};

export default Error;
