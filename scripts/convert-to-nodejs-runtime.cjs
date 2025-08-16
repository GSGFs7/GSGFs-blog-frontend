/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (
      stat.isDirectory() &&
      !filePath.includes("node_modules") &&
      !filePath.includes(".next")
    ) {
      findPageFiles(filePath, fileList);
    } else if (
      file == "page.tsx" ||
      file === "not-found.tsx" ||
      file === "error.tsx" ||
      file === "route.ts" ||
      file === "layout.tsx"
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function addEdgeRuntime(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  if (content.includes('export const runtime = "edge"')) {
    content = content.replace('export const runtime = "edge";\n\n', "");
    fs.writeFileSync(filePath, content);
    console.log(`add nodejs run time to ${filePath}`);
  }
}

function main() {
  const appDir = path.join(process.cwd(), "app");
  const pageFiles = findPageFiles(appDir);

  pageFiles.forEach(addEdgeRuntime);
  console.log(`succeed. total match ${pageFiles.length} files`);
}

main();
