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
      updateBody: Object.keys(collectionSchema).join(", "),
    });
    const fileName = `${appName}.${templateType}.js`;
    fs.writeFileSync(new URL(`${appName}/${fileName}`, appDir), content);
  });

  // Update router.js with new route
  const routerPath = new URL(`${targetDir}/../router.js`, import.meta.url);
  let routerContent = fs.readFileSync(routerPath, 'utf8');

  // Add import statement if not exists
  const importStatement = `import ${vars.camel}Router from "./apps/${vars.original}/${vars.original}.router.js";`;
  if (!routerContent.includes(importStatement)) {
    const lastImportIndex = routerContent.lastIndexOf('import');
    const endOfLastImport = routerContent.indexOf('\n', lastImportIndex) + 1;
    routerContent = routerContent.slice(0, endOfLastImport) + importStatement + '\n' + routerContent.slice(endOfLastImport);
  }

  // Add route registration if not exists
  const routeStatement = `router.use("/${vars.pluralLower}", ${vars.camel}Router);`;
  if (!routerContent.includes(routeStatement)) {
    const routerDeclarationIndex = routerContent.indexOf('const router = Router();') + 'const router = Router();'.length;
    routerContent = routerContent.slice(0, routerDeclarationIndex) + '\n\n' + routeStatement + routerContent.slice(routerDeclarationIndex);
  }

  fs.writeFileSync(routerPath, routerContent);
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
targetDir: "../src/apps"
});