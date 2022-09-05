const fs = require("fs");

console.log("Copying components into extension");

console.log("Starting...");

const COMPONENT_PATH = "./packages/chrome-extension/build/static";

const jsFiles = fs
  .readdirSync("packages/language-fixer-ui/build/static/js")
  .filter((f) => f.startsWith("main") && f.endsWith(".js"))[0];
console.log("Moving: ", jsFiles);
fs.rename(
  `packages/language-fixer-ui/build/static/js/${jsFiles}`,
  `${COMPONENT_PATH}/js/mainContainer.js`,
  (err) => {
    err && console.error(err);
  }
);

const mapFile = fs
  .readdirSync("packages/language-fixer-ui/build/static/js")
  .filter((f) => f.startsWith("main") && f.endsWith("js.map"))[0];
console.log("Moving: ", mapFile);
fs.rename(
  `packages/language-fixer-ui/build/static/js/${mapFile}`,
  `${COMPONENT_PATH}/js/mainContainer.js.map`,
  (err) => {
    err && console.error(err);
  }
);

const chunkFile = fs
  .readdirSync("packages/language-fixer-ui/build/static/js")
  .filter((f) => f.endsWith("chunk.js"))[0];
console.log("Moving: ", chunkFile);
fs.rename(
  `packages/language-fixer-ui/build/static/js/${chunkFile}`,
  `${COMPONENT_PATH}/js/mainContainer.chunk.js`,
  (err) => {
    err && console.error(err);
  }
);

const chunkMapFile = fs
  .readdirSync("packages/language-fixer-ui/build/static/js")
  .filter((f) => f.endsWith("chunk.js.map"))[0];
console.log("Moving: ", chunkMapFile);
fs.rename(
  `packages/language-fixer-ui/build/static/js/${chunkMapFile}`,
  `${COMPONENT_PATH}/js/mainContainer.chunk.js.map`,
  (err) => {
    err && console.error(err);
  }
);

const cssFile = fs
  .readdirSync("packages/language-fixer-ui/build/static/css")
  .filter((f) => f.startsWith("main") && f.endsWith(".css"))[0];
console.log("Moving: ", cssFile);
fs.rename(
  `packages/language-fixer-ui/build/static/css/${cssFile}`,
  `${COMPONENT_PATH}/css/mainContainer.css`,
  (err) => {
    err && console.error(err);
  }
);
