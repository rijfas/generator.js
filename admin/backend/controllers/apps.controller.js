import { dirname } from "path";
import { fileURLToPath } from "url";
import { getApps } from "../utils/file-scanner.util.js";
import { generateApp } from "../utils/generate/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAllApps = (req, res) => {
  const apps = getApps(`${process.cwd()}/src/apps`).map((e, i) => {
    return { id: i, app: e };
  });
  res.json({ apps });
};

export const getAppById = (req, res) => {
  const { id } = req.params;
  const apps = getApps();

  if (!apps.includes(id)) {
    return res.status(404).json({ error: "App not found" });
  }

  res.json({ app: id });
};

export const createApp = (req, res) => {
  try {
    if (!req.body || !req.body.appName) {
      return res
        .status(400)
        .json({ error: "appName is required in request body" });
    }

    const result = generateApp({
      appName: req.body.appName,
      targetDir: `${process.cwd()}/src/apps`,
    });

    if (result) {
      res.status(201).json({ message: "App created successfully" });
    } else {
      res.status(409).json({ message: "App already exists" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
};

export const updateApp = (req, res) => {
  const { id } = req.params;
  // Implementation for updating app
  res.json({ message: "App updated" });
};

export const deleteApp = (req, res) => {
  const { id } = req.params;
  // Implementation for deleting app
  res.json({ message: "App deleted" });
};
