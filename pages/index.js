import React, { useState, useReducer, useEffect } from "react";
import matter from "gray-matter";
import Link from "next/link";

import Layout from "../components/Layout";
import Tags from "../components/Tags";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date(date);

  return today.toLocaleDateString("en-US", options);
}

function freshWriting(date) {
  const writingDate = new Date(date).getTime();
  const today = new Date().getTime();

  return today - writingDate < 60 * 60 * 1000 * 24 * 2; // 2 days old
}

const Homepage = (props) => {
  const writings = props.writings;

  const [visibleWritings, setVisibleWritings] = useState(writings);
  const filterReducer = (state = new Set([]), action) => {
    switch (action.type) {
      case "ADD_FILTER":
        return new Set([...state, action.filter.trim()]);
      case "REMOVE_FILTER":
        return new Set([...state].filter((filter) => filter !== action.filter));
      case "RESET_FILTER":
        return new Set([]);
      default:
        return state;
    }
  };

  const [filters, filterDispatcher] = useReducer(filterReducer, new Set([]));

  const searchAction = () => {
    const searchInput = document.getElementById("search-input");

    if (searchInput.value.length !== 0) {
      searchInput.value.split(",").map((filter) => {
        filterDispatcher({ type: "ADD_FILTER", filter: filter });
      });
      searchInput.value = "";
    }
  };

  useEffect(() => {
    if (filters.size !== 0) {
      setVisibleWritings(
        [...writings].filter(({ document }) => {
          let flag = true;
          [...filters].map((filter) => {
            if (!document.data.tags.split(",").includes(filter)) flag = false;
          });
          return flag;
        })
      );
    } else {
      setVisibleWritings(writings);
    }
  }, [filters]);

  return (
    <>
      <Layout isHomepage>
        <SearchBar onSearch={searchAction} />

        {filters.size !== 0 && (
          <Filters filters={filters} filterDispatcher={filterDispatcher} />
        )}

        <div className="writing-list">
          {visibleWritings.map(({ document, slug }) => {
            const {
              data: { title, date, tags, og },
            } = document;
            const tagItems = tags.split(",");

            return (
              <div className="writing-row" key={title}>
                <Link href="/writings/[slug]" as={`/writings/${slug}`}>
                  <a>
                    <div className="writing-description">
                      <div className="writing-title">{title}</div>
                      <div className="writing-subtitle">{og.description}</div>
                    </div>
                  </a>
                </Link>

                <div>
                  <Tags
                    tags={tagItems}
                    onClick={(filter) => {
                      filterDispatcher({
                        type: "ADD_FILTER",
                        filter: filter,
                      });
                    }}
                  />

                  <div className="date-row">
                    <div className="writing-date">{formatDate(date)}</div>
                    {freshWriting(date) && <div className="pulse" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const writings = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      const slug = key
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");

      const value = values[index];
      const document = matter(value.default);

      return {
        document: { content: document.content, data: document.data },
        slug,
      };
    });

    return data
      .slice()
      .sort(
        (a, b) =>
          new Date(b.document.data.date) - new Date(a.document.data.date)
      );
  })(require.context("../writings", true, /\.md$/));

  const props = { writings: writings };
  // console.log(props);
  return {
    props: props,
  };
}

export default Homepage;
