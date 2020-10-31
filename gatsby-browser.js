/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

require("fontsource-almendra");
require("fontsource-pacifico");
require("fontsource-aleo");

const postEnv = require("postcss-preset-env");
postEnv.process("../styles/css/index.css");
