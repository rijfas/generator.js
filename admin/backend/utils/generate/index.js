// index.js
import ejs from "ejs";
import fs from "fs-extra";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { appendRouter, processAppName, serializeSchema } from "./utils.js";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const generateApp = ({ appName, targetDir = process.cwd() }) => {
  appName = processAppName(appName);
  const appDir = path.resolve(__dirname, targetDir, appName.original);

  // Create app directory
  fs.ensureDirSync(appDir);

  return true;
};

export const addModel = ({
  appName,
  modelName,
  collectionSchema,
  targetDir = process.cwd(),
}) => {
  appName = processAppName(appName);
  modelName = processAppName(modelName);
  // const appDir = new URL(`${targetDir}/${appName.original}`, import.meta.url);

  const appDir = path.resolve(__dirname, targetDir, appName.original);
  

  // Generate model file
  const modelTemplatePath = new URL(`./templates/model.ejs`, import.meta.url);
  const modelContent = ejs.render(fs.readFileSync(modelTemplatePath, "utf8"), {
    modelName,
    collectionSchema: serializeSchema(collectionSchema),
  });
  const modelFileName = `${modelName.pascal}.model.js`;
  fs.writeFileSync(
    // new URL(`${appName.original}/${modelFileName}`, appDir),
    path.resolve(appDir, modelFileName),
    modelContent
  );

  // Generate controller file
  const controllerTemplatePath = new URL(
    `./templates/controller.ejs`,
    import.meta.url
  );
  const controllerContent = ejs.render(
    fs.readFileSync(controllerTemplatePath, "utf8"),
    {
      modelName,
      collectionSchema: serializeSchema(collectionSchema),
      createBody: Object.keys(collectionSchema).join(", "),
      updateBody: Object.keys(collectionSchema).join(", "),
    }
  );
  const controllerFileName = `${modelName.original}.controller.js`;
  fs.writeFileSync(
    // new URL(`${appName.original}/${controllerFileName}`, appDir)
    path.resolve(appDir, controllerFileName),
    controllerContent
  );

  // Generate router file
  const routerTemplatePath = new URL(`./templates/router.ejs`, import.meta.url);
  const routerContent = ejs.render(
    fs.readFileSync(routerTemplatePath, "utf8"),
    {
      modelName,
    }
  );
  const routerFileName = `${modelName.original}.router.js`;
  fs.writeFileSync(
    // new URL(`${appName.original}/${routerFileName}`, appDir),
    path.resolve(appDir, routerFileName),
    routerContent
  );

  appendRouter(appName, modelName, targetDir);
};
