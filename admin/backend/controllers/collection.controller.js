import mongoose from "mongoose";
import pluralize from "pluralize";
import GeneratorEngine from "../../engine/index.js";
import errorWrapper from "../middlewares/error-wrapper.middleware.js";

const engine = GeneratorEngine.getInstance();

export const getCollections = errorWrapper(async (req, res, next) => {
  const collections = Object.keys(mongoose.models);

  const schemas = await engine
    .getSchemas(req.params.app_name)
    .then((schemas) =>
      schemas.map((schema) => pluralize(schema.name.toLocaleLowerCase()))
    );

  collections.filter((collection) => schemas.includes(collection));
  res.json({
    collections: collections.filter((collection) =>
      schemas.includes(collection)
    ),
  });
});

export const getCollectionInfo = errorWrapper(async (req, res) => {
  const { collection_name } = req.params;

  const model = mongoose.model(collection_name);
  const schema = model.schema;

  const fields = Object.keys(schema.paths).map((path) => ({
    name: path,
    type: schema.paths[path].instance,
    required: schema.paths[path].isRequired || false,
  }));

  const data = await model.find({});

  res.json({
    collection_name,
    fields,
    data,
  });
});

export const createEntry = errorWrapper(async (req, res) => {
  const { collection_name } = req.params;
  const model = mongoose.model(collection_name);
  const newEntry = new model(req.body);
  const result = await newEntry.save();
  res.status(201).json(result);
});

export const updateEntry = errorWrapper(async (req, res) => {
  const { collection_name, entry_id } = req.params;
  const model = mongoose.model(collection_name);
  const result = await model.findByIdAndUpdate(entry_id, req.body, {
    new: true,
  });
  if (!result) {
    return res.status(404).json({ error: "Entry not found" });
  }
  res.json(result);
});

export const deleteEntry = errorWrapper(async (req, res) => {
  const { collection_name, entry_id } = req.params;
  const model = mongoose.model(collection_name);
  const result = await model.findByIdAndDelete(entry_id);
  if (!result) {
    return res.status(404).json({ error: "Entry not found" });
  }
  res.json({ message: "Entry deleted successfully" });
});
