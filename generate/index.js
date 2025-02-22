// index.js
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs-extra";
import ejs from "ejs";
import { processAppName, serializeSchema, appendRouter } from "./utils.js";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const generateApp = ({appName, collectionSchema, targetDir = process.cwd()}) => {
  appName = processAppName(appName);

  // Ensure cross-platform path resolution
  const appDir = path.resolve(__dirname, targetDir, appName.original);

  // Create app directory
  fs.ensureDirSync(appDir);

  // Generate files from templates
  const templates = [
    "controller",
    "model",
    "router",
    "service",
    "utils",
    "validator",
  ];

  templates.forEach((templateType) => {
    const templatePath = new URL(
      `./templates/${templateType}.ejs`,
      import.meta.url
    );
    const content = ejs.render(fs.readFileSync(templatePath, "utf8"), {
      appName: appName,
      collectionSchema: serializeSchema(collectionSchema),
      createBody: Object.keys(collectionSchema).join(", "),
      updateBody: Object.keys(collectionSchema).join(", "),
    });
    const fileName = `${appName.original}.${templateType}.js`;
    fs.writeFileSync(path.resolve(appDir, fileName), content);
  });

  appendRouter(appName, targetDir);

  
};

// generateApp({
//   appName:"User", collectionSchema: {
//   name: {
//       type: String,
//   },
//   email: {
//       type: String,
//       required: true,
//       unique: true,
//   },
 
//   password: {
//       type: String,
//       required:true,
//   },
//   isAdmin: {
//       type: Boolean,
//       default: false,
//   },
//   isActive: {
//       type: Boolean,
//       default: false,
//   },
//   isBlocked: {
//       type: Boolean,
//       default: false,
//   },
//   isDeleted: {
//       type: Boolean,
//       default: false,
//   },
// },
// targetDir: "../src/apps"
// });