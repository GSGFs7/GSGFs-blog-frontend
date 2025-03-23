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

function renderMD() {
  let content = fs.readFileSync("components/blog/runtime-adapter.ts", "utf-8");

  content = content.replace(
    'return import("./client-blog-wrapper");',
    'return import("./server-blog-wrapper");',
  );

  fs.writeFileSync("components/blog/runtime-adapter.ts", content);
}

function main() {
  const appDir = path.join(process.cwd(), "app");
  const pageFiles = findPageFiles(appDir);

  renderMD();

  pageFiles.forEach(addEdgeRuntime);
  console.log(`succeed. total ${pageFiles.length} files`);
}

main();
