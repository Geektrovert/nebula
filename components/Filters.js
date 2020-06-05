import React from "react";

const Filters = ({ filters, filterDispatcher }) => (
  <div className="filters">
    <div className="filter-label">Filter:</div>
    {[...filters].map((filter) => (
      <div
        key={filter}
        className="tag"
        onClick={() =>
          filterDispatcher({ type: "REMOVE_FILTER", filter: filter })
        }
      >
        {filter}
      </div>
    ))}
    <button
      className="btn"
      onClick={() => filterDispatcher({ type: "RESET_FILTER" })}
    >
      clear
    </button>
  </div>
);

export default Filters;
