import GeneratorEngine from "../../engine/index.js";

const engine = GeneratorEngine.getInstance();

export const getAllApps = async (req, res) => {
  const apps = await engine.getApps();
  res.json({ apps });
};

export const createApp = async (req, res) => {
  try {
    if (!req.body || !req.body.appName) {
      return res
        .status(400)
        .json({ error: "appName is required in request body" });
    }

    const result = await engine.createApp(req.body.appName);

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
