import GeneratorEngine from "../../engine/index.js";

const engine = GeneratorEngine.getInstance();

export const getAllSchemas = async (req, res) => {
  const { appName } = req.params;
  const schemas = await engine.getSchemas(appName);
  res.json({ schemas });
};

export const createSchema = async (req, res) => {
  const { modelName, collectionSchema } = req.body;

  if (!modelName || !collectionSchema) {
    return res
      .status(400)
      .json({ error: "Model name and collection schema are required" });
  }

  const { appName } = req.params;

  const schemas = await engine.getSchemas(appName);
  const schemaExists = schemas.some((s) => s.name === modelName);

  if (schemaExists) {
    return res.status(400).json({ error: "Schema already exists" });
  }

  const schemaObject = {};
  collectionSchema.properties.forEach((property) => {
    schemaObject[property.name] = {
      type: property.type,
      required: property.required || false,
    };
  });

  await engine.addSchema(appName, modelName, schemaObject);

  res.status(201).json({ message: "Schema created" });
};
