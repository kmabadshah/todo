/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const postEnv = require("postcss-preset-env");
postEnv.process("../styles/css/index.css");
