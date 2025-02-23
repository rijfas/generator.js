import GeneratorEngine from "../../engine/index.js";

const engine = GeneratorEngine.getInstance();

export const getAllEndPoints = async (req, res) => {
  try {
    const { appName } = req.params;
    const endpoints = await engine.getEndpoints(appName);
    res.status(200).json(endpoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
