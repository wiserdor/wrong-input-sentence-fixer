const fs = require("fs");

console.log("Copying components into extension");

console.log("Starting...");

const COMPONENT_PATH = "./packages/chrome-extension/mainContainer";

if (fs.existsSync(COMPONENT_PATH)) {
  fs.rmSync(COMPONENT_PATH, { recursive: true, force: true });
}
fs.mkdirSync(COMPONENT_PATH);

const jsFiles = fs
  .readdirSync("packages/language-fixer-ui/build/static/js")
  .filter((f) => f.startsWith("main") && f.endsWith(".js"));
console.log(jsFiles);
jsFiles.forEach((f) => {
  fs.rename(
    `packages/language-fixer-ui/build/static/js/${f}`,
    `${COMPONENT_PATH}/mainContainer.js`,
    (err) => {
      console.error(err);
    }
  );
});

const cssFiles = fs
  .readdirSync("packages/language-fixer-ui/build/static/css")
  .filter((f) => f.startsWith("main") && f.endsWith(".css"));
cssFiles.forEach((f) => {
  fs.rename(
    `packages/language-fixer-ui/build/static/css/${f}`,
    `${COMPONENT_PATH}/mainContainer.css`,
    (err) => {
      console.error(err);
    }
  );
});
