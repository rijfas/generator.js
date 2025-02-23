import pluralize from "pluralize";
import { getSchemas } from "../utils/file-scanner.util.js";
import mongoose from "mongoose";

export const getCollections = async (req, res) => {
  try {
    const collections = Object.keys(mongoose.models);
        
    const schemas = getSchemas(`${process.cwd()}/src/apps/${req.params.app_name}`)?.map(schema => pluralize(schema.name.toLocaleLowerCase()));
    
    collections.filter((collection) => schemas.includes(collection));
    res.json({
      collections: collections.filter((collection) => schemas.includes(collection))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getCollectionInfo = async (req, res) => {
  try {
    const { collection_name } = req.params;

    const model = mongoose.model(collection_name);
    const schema = model.schema;
    
    const fields = Object.keys(schema.paths).map(path => ({
      name: path,
      type: schema.paths[path].instance,
      required: schema.paths[path].isRequired || false
    }));

    const data = await model.find({});

    res.json({
      collection_name,
      fields,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEntry = async (req, res) => {
  try {
    const { collection_name } = req.params;
    const model = mongoose.model(collection_name);
    const newEntry = new model(req.body);
    const result = await newEntry.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { collection_name, entry_id } = req.params;
    const model = mongoose.model(collection_name);
    const result = await model.findByIdAndUpdate(entry_id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const { collection_name, entry_id } = req.params;
    const model = mongoose.model(collection_name);
    const result = await model.findByIdAndDelete(entry_id);
    if (!result) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
