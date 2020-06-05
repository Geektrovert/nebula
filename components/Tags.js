import React from "react";

const Tags = ({ tags, withTitle = false }) => (
  <div className="tags">
    {withTitle && <span style={{ marginRight: "1rem" }}>Tags:</span>}
    {tags.map((tag) => (
      <div key={tag} className="tag">
        {tag}
      </div>
    ))}
  </div>
);

export default Tags;
