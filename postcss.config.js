// const auxer = require(`autoprefixer`);

modules.exports = () => {
  plugins: [auxer.process(require.resolve("./src/styles/css/index.css"))];
};
