import { getSchemas } from '../utils/file-scanner.util.js';
import path from 'path';

export const getAllSchemas = (req, res) => {
  const { id } = req.params;
  const appPath = path.join('../src/apps', id);
  const schemas = getSchemas(appPath);
  res.json({ schemas });
};

export const getSchemaById = (req, res) => {
  const { id, schema_id } = req.params;
  const appPath = path.join('../src/apps', id);
  const schemas = getSchemas(appPath);
  const schema = schemas.find(s => s.name === schema_id);
  
  if (!schema) {
    return res.status(404).json({ error: 'Schema not found' });
  }
  
  res.json({ schema });
};

export const createSchema = (req, res) => {
  // Implementation for creating new schema file
  res.status(201).json({ message: 'Schema created' });
};

export const updateSchema = (req, res) => {
  const { id, schema_id } = req.params;
  // Implementation for updating schema
  res.json({ message: 'Schema updated' });
};

export const deleteSchema = (req, res) => {
  const { id, schema_id } = req.params;
  // Implementation for deleting schema
  res.json({ message: 'Schema deleted' });
};
