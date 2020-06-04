import React from "react";

import Layout from "../components/Layout";

const Uncopyright = () => (
  <Layout>
    <div style={{ marginTop: "50px" }}>
      <h1 className="writing-title-h1">Uncopyright</h1>
    </div>
    <div className="writing-container">
      <p>
        No permission is needed to copy, distribute, or modify the content or
        source of this site. Credit is appreciated but not required.
      </p>
      <p>
        <h4>
          Terms and Conditions for Copying, Distribution and Modification:
        </h4>
        <ul>
          <li>Do whatever the hell you like.</li>
        </ul>
      </p>
    </div>
  </Layout>
);

export default Uncopyright;
