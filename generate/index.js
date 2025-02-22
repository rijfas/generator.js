// index.js
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs-extra";
import ejs from "ejs";
import { processAppName } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const generateApp = (appName, targetDir = process.cwd()) => {
  const vars = processAppName(appName);
  const appDir = new URL(`${targetDir}/${appName}`, import.meta.url);

  // Create app directory
  fs.ensureDirSync(appDir);

  // Generate files from templates
  const templates = [
    // "controller",
    // "model",
    "router",
    // "service",
    // "utils",
    // "validator",
  ];

  templates.forEach((templateType) => {
    const templatePath = new URL(
      `./templates/${templateType}.ejs`,
      import.meta.url
    );
    const content = ejs.render(fs.readFileSync(templatePath, "utf8"), vars);
    const fileName = `${appName}.${templateType}.js`;
    fs.writeFileSync(new URL(`${appName}/${fileName}`, appDir), content);
  });
};

generateApp("product", "./tmp");