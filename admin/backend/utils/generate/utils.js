import { camelCase, pascalCase } from "change-case";
import fs from "fs";
import mongoose from "mongoose";
import pluralize from "pluralize";

const processAppName = (name) => {
  const pascal = pascalCase(name);

  return {
    original: name,
    originalCapital: name.charAt(0).toUpperCase() + name.slice(1),
    pascal: pascal,
    camel: camelCase(name),
    plural: pluralize(pascal),
    pluralLower: pluralize(name).toLowerCase(),
  };
};

const serializeSchema = (schema) => {
  return JSON.stringify(
    schema,
    (key, value) => {
      if (value === String) return "String";
      if (value === Number) return "Number";
      if (value === Boolean) return "Boolean";
      if (value === Date) return "Date";
      if (value === Buffer) return "Buffer";
      if (Array.isArray(value))
        return `[${value.map((v) =>
          v === String ? "String" : JSON.stringify(v)
        )}]`;
      if (value && value.type === mongoose.Schema.Types.ObjectId)
        return "{ type: mongoose.Schema.Types.ObjectId }";
      return value;
    },
    2
  )
    .replace(/"String"/g, "String")
    .replace(/"Number"/g, "Number")
    .replace(/"Boolean"/g, "Boolean")
    .replace(/"Date"/g, "Date")
    .replace(/"Buffer"/g, "Buffer")
    .replace(
      /"type": "mongoose.Schema.Types.ObjectId"/g,
      "type: mongoose.Schema.Types.ObjectId"
    );
};

const appendRouter = (appName, modelName, targetDir) => {
  // Update router.js with new route
  const routerPath = new URL(`${targetDir}/../router.js`, import.meta.url);
  let routerContent = fs.readFileSync(routerPath, "utf8");

  // Add import statement if not exists
  const importStatement = `import ${modelName.camel}Router from "./apps/${appName.original}/${modelName.original}.router.js";`;
  if (!routerContent.includes(importStatement)) {
    const lastImportIndex = routerContent.lastIndexOf("import");
    const endOfLastImport = routerContent.indexOf("\n", lastImportIndex) + 1;
    routerContent =
      routerContent.slice(0, endOfLastImport) +
      importStatement +
      "\n" +
      routerContent.slice(endOfLastImport);
  }

  // Add route registration if not exists
  const routeStatement = `router.use("/${modelName.pluralLower}", ${modelName.camel}Router);`;
  if (!routerContent.includes(routeStatement)) {
    const routerDeclarationIndex =
      routerContent.indexOf("const router = Router();") +
      "const router = Router();".length;
    routerContent =
      routerContent.slice(0, routerDeclarationIndex) +
      "\n\n" +
      routeStatement +
      routerContent.slice(routerDeclarationIndex);
  }

  fs.writeFileSync(routerPath, routerContent);
};

export { appendRouter, processAppName, serializeSchema };
