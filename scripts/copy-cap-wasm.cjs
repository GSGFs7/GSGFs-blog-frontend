/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

const capLicense = path.join(
  process.cwd(),
  "node_modules/@cap.js/widget/LICENSE",
);
const capReadme = path.join(
  process.cwd(),
  "node_modules/@cap.js/wasm/README.md",
);
const capWasmJs = path.join(
  process.cwd(),
  "node_modules/@cap.js/wasm/browser/cap_wasm.js",
);
const capWasm = path.join(
  process.cwd(),
  "node_modules/@cap.js/wasm/browser/cap_wasm_bg.wasm",
);
const files = [capLicense, capReadme, capWasmJs, capWasm];

const targetDir = path.join(process.cwd(), "public/cap/");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

for (const file of files) {
  const dest = path.join(targetDir, path.basename(file));
  fs.copyFileSync(file, dest);
}
