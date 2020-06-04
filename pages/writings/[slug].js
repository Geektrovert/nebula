import React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import ProgressBar from "react-scroll-progress-bar";

import Layout from "../../components/Layout";
import CodeBlock from "../../components/CodeBlock";

function Writing({ content, data }) {
  const frontmatter = data;
  const { title, author, tags } = frontmatter;

  return (
    <>
      <div className="writing-progress">
        <ProgressBar height="0.4rem" />
      </div>

      <Layout secondaryPage noHead>
        <div style={{ marginTop: 50 }}>
          <h1 className="writing-title-h1">{title}</h1>

          <div className="author">{author.name}</div>

          <div className="writing-container">
            <ReactMarkdown
              source={content}
              escapeHtml={false}
              renderers={{
                code: CodeBlock,
                link: (props) => {
                  if (!props.href.startsWith("http")) {
                    return props.href;
                  }

                  return (
                    <a
                      href={props.href}
                      rel="nofollow noreferrer noopener"
                      target="_blank"
                    >
                      {props.children}
                    </a>
                  );
                },
              }}
            />
          </div>

          <div className="tags">
            <span style={{ marginRight: "1rem" }}>Tags:</span>
            {tags.split(",").map((tag) => (
              <div key={tag} className="tag">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

Writing.getInitialProps = async (context) => {
  const { slug } = context.query;
  const content = await import(`../../writings/${slug}.md`);
  const data = matter(content.default);

  return { ...data };
};

export default Writing;
