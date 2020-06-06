import React from "react";

import ErrorLayout from "../components/Error";

const Error = ({ statusCode }) => {
  const err404 = { src: "/images/alien.svg", alt: "lost in space" };
  const err500 = { src: "/images/sorry.svg", alt: "we're sad and sorry" };
  if (statusCode === 404) {
    return (
      <ErrorLayout
        title="Oh no, this page was taken away by the aliens!"
        image={err404}
      />
    );
  } else if (statusCode === 500) {
    return (
      <ErrorLayout
        title="Oh no, something went wrong with our servers!"
        image={err500}
      />
    );
  } else {
    return (
      <>
        {statusCode ? (
          <ErrorLayout
            title={`Oh no, some error ${statusCode} occurred on server side`}
            image={err500}
          />
        ) : (
          <ErrorLayout
            title={`Oh no, some error occurred on your side`}
            image={err500}
          />
        )}
      </>
    );
  }
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
