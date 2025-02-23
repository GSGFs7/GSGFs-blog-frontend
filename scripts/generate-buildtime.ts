import { writeFileSync } from "fs";
import { join } from "path";

const buildTime = new Date().toISOString();
const content = `export const BUILD_TIME = "${buildTime}";`;

writeFileSync(join(process.cwd(), "lib", "buildtime.ts"), content);
