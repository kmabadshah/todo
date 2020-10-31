/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          entry: [`/src/styles/css/index.css`],
          output: {
            filename: `index2.css`,
            publicPath: `/src/styles/css/`,
          },
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
            },
          ],
          node: { fs: "empty" },
        },
      ],
    },
  });
};
