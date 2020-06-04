import React from "react";
import matter from "gray-matter";
import Link from "next/link";

import Layout from "../components/Layout";

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

function Homepage({ writings }) {
  return (
    <>
      <Layout isHomepage>
        <div className="writing-list">
          {writings.map(({ document, slug }) => {
            const {
              data: { title, date, tags },
            } = document;

            return (
              <Link href="/writings/[slug]" as={`/writings/${slug}`}>
                <a>
                  <div className="writing-row" key={title}>
                    <span className="writing-title">{title}</span>
                    <div className="title-tags">
                      <div className="tags">
                        {tags.split(",").map((tag) => (
                          <div key={tag} className="tag">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="date-row">
                      <div className="writing-date">{formatDate(date)}</div>
                      {freshWriting(date) && <div className="pulse" />}
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

Homepage.getInitialProps = async (context) => {
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
      return { document, slug };
    });

    return data
      .slice()
      .sort(
        (a, b) =>
          new Date(b.document.data.date) - new Date(a.document.data.date)
      );
  })(require.context("../writings", true, /\.md$/));

  return {
    writings,
  };
};
export default Homepage;
