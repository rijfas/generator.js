import path from "path";
import { getSchemas } from "../utils/file-scanner.util.js";
import { addModel } from "../utils/generate/index.js";

export const getAllSchemas = (req, res) => {
  const { id } = req.params;
  const appPath = path.join("../src/apps", id);
  const schemas = getSchemas(appPath);
  res.json({ schemas });
};

export const getSchemaById = (req, res) => {
  const { id, schema_id } = req.params;
  const appPath = path.join("../src/apps", id);
  const schemas = getSchemas(appPath);
  const schema = schemas.find((s) => s.name === schema_id);

  if (!schema) {
    return res.status(404).json({ error: "Schema not found" });
  }

  res.json({ schema });
};

export const createSchema = (req, res) => {
  const { modelName, collectionSchema } = req.body;

  if (!modelName || !collectionSchema) {
    return res
      .status(400)
      .json({ error: "Model name and collection schema are required" });
  }

  const appPath = path.join("../src/apps", req.params.id);
  const schemas = getSchemas(appPath);
  const schemaExists = schemas.some((s) => s.name === modelName);

  if (schemaExists) {
    return res.status(400).json({ error: "Schema already exists" });
  }

  addModel({
    appName: req.params.id,
    modelName: req.body.modelName,
    collectionSchema: req.body.collectionSchema,
    targetDir: `${process.cwd()}/src/apps`,
  });

  res.status(201).json({ message: "Schema created" });
};

export const updateSchema = (req, res) => {
  const { id, schema_id } = req.params;
  // Implementation for updating schema
  res.json({ message: "Schema updated" });
};

export const deleteSchema = (req, res) => {
  const { id, schema_id } = req.params;
  // Implementation for deleting schema
  res.json({ message: "Schema deleted" });
};
