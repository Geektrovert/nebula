import React from "react";

const Tags = ({ tags, onClick, withTitle = false }) => (
  <div className="tags">
    {withTitle && <span style={{ marginRight: "1rem" }}>Tags:</span>}
    {tags.map((tag) => (
      <div key={tag} className="tag" onClick={() => onClick(tag)}>
        {tag}
      </div>
    ))}
  </div>
);

export default Tags;
