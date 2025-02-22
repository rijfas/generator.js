import { generateApp } from "../../../generate/index.js";

export const createApp = async (req, res, next) => {
  try {
    const { appName, collectionSchema } = req.body;
    if (!appName || !collectionSchema) {
      return res
        .status(400)
        .json({ message: "appName and collectionSchema are required" });
    }
    
    generateApp({ appName, collectionSchema, targetDir: `${process.cwd()}/src/apps` });
    return res.status(201).json({ message: "App created" });
  } catch (error) {
    next(error);
  }
};
