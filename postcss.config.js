const postcssPresetEnv = require(`postcss-preset-env`);

modules.exports = () => {
  plugins: [
    postcssPresetEnv({
      stage: 2,
    }),
  ];
};
