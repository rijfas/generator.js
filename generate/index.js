// index.js
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs-extra";
import ejs from "ejs";
import { processAppName, serializeSchema } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));



export const generateApp = ({appName, collectionSchema, targetDir = process.cwd()}) => {
  const vars = processAppName(appName);
  const appDir = new URL(`${targetDir}/${appName}`, import.meta.url);

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
      ...vars,
      collectionSchema: serializeSchema(collectionSchema),
      createBody: Object.keys(collectionSchema).join(", "),
    });
    const fileName = `${appName}.${templateType}.js`;
    fs.writeFileSync(new URL(`${appName}/${fileName}`, appDir), content);
  });
};

generateApp({
  appName:"product", collectionSchema: {
  name: {
      type: String,
  },
  email: {
      type: String,
      required: true,
      unique: true,
  },
 
  password: {
      type: String,
      required:true,
  },
  isAdmin: {
      type: Boolean,
      default: false,
  },
  isActive: {
      type: Boolean,
      default: false,
  },
  isBlocked: {
      type: Boolean,
      default: false,
  },
  isDeleted: {
      type: Boolean,
      default: false,
  },
},
targetDir: "./tmp"
});