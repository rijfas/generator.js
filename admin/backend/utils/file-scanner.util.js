import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { addModel } from "./generate/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getApps = (appsPath = process.cwd()) => {
  try {
    return fs
      .readdirSync(appsPath)
      .filter((file) => fs.statSync(path.join(appsPath, file)).isDirectory());
  } catch (error) {
    console.error("Error reading apps directory:", error);
    return [];
  }
};

export const createApp = (appPath = process.cwd()) => {
  try {
    if (typeof appPath !== "string") {
      throw new Error("App path must be a string");
    }

    if (!fs.existsSync(appPath)) {
      fs.mkdirSync(appPath, { recursive: true });
      console.log(`Created App: ${appPath}`);
      return true;
    } else {
      console.log(`App already exists: ${appPath}`);
      return false;
    }
  } catch (error) {
    console.error("Error creating App:", error);
    throw error;
  }
};

export const getSchemas = (appPath = process.cwd()) => {
  try {
    return fs
      .readdirSync(appPath)
      .filter((file) => file.endsWith(".model.js"))
      .map((file) => ({
        name: file.replace(".model.js", ""),
        content: fs.readFileSync(path.join(appPath, file), "utf-8"),
      }));
  } catch (error) {
    console.error("Error reading schemas:", error);
    return [];
  }
};

export const createSchema = (appName, modelName, collectionSchema) => {
  try {
    addModel({
      appName,
      modelName,
      collectionSchema,
      targetDir: process.cwd(),
    });
    console.log(`Created Schema for ${modelName} in ${appName}`);
    return true;
  } catch (error) {
    console.error("Error creating schema:", error);
    throw error;
  }
};
