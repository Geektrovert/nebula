const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withTM = require("next-transpile-modules");

module.exports = withCSS(
  withSass(
    withTM({
      transpileModules: ["react-syntax-highlighter"],
      webpack: function (config) {
        config.module.rules.push({
          test: /\.md$/,
          use: "raw-loader",
        });
        return config;
      },
      exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
      ) {
        return {
          "/": { page: "/" },
          "/writings/guide": {
            page: "/writings/[slug]",
            query: { slug: "guide" },
          },
        };
      },
    })
  )
);
