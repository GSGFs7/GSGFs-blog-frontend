const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const inputPath = path.join(__dirname, "../public/1.jpg");
const outputPath = path.join(__dirname, "../public/1.webp");

sharp(inputPath)
  // .resize({ width: 800 })
  .webp({ quality: 100, compressionLevel: 9 })
  .toFile(outputPath)
  .then((info) => {
    console.log("Image optimized: ", info);
    console.log(`Original size: ${fs.statSync(inputPath).size / 1024}KB`);
    console.log(`Optimized size: ${fs.statSync(outputPath).size / 1024}KB`);
  })
  .catch((err) => console.error(err));
