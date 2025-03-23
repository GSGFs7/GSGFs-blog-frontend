// Convert runtime to edge runtime to delay the project to cloudflare page

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
      file === "route.ts"
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// console.log(findPageFiles("./"));

function addEdgeRuntime(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  if (
    content.startsWith('"use client";') &&
    !content.includes('export const runtime = "edge"')
  ) {
    // Insert after "use client" declaration
    content = content.replace(
      '"use client";',
      '"use client";\n\nexport const runtime = "edge";',
    );
    fs.writeFileSync(filePath, content);
    console.log(`add edge run time to ${filePath}`);
  } else if (!content.includes('export const runtime = "edge"')) {
    // If no "use client", add at the beginning
    content = `export const runtime = "edge";\n\n${content}`;
    fs.writeFileSync(filePath, content);
    console.log(`add edge run time to ${filePath}`);
  }
}

function main() {
  const appDir = path.join(process.cwd(), "app");
  const pageFiles = findPageFiles(appDir);

  pageFiles.forEach(addEdgeRuntime);
  console.log(`succeed. total ${pageFiles.length} files`);
}

main();
