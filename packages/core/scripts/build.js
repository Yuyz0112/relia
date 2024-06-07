const fs = require("fs");
const path = require("path");
const { build } = require("tsup");

(async () => {
  await build({
    entry: ["src/index.ts"],
    dts: true,
    format: ["cjs"],
  });

  const filePath = path.resolve(__dirname, "../dist/index.js");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const modifiedContent = fileContent.replace(
    'require("assert")',
    'require("node:assert")'
  );
  fs.writeFileSync(filePath, modifiedContent);
})();
