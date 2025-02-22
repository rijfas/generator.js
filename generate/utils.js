import pluralize from "pluralize";
import { pascalCase, camelCase } from "change-case";
import mongoose from "mongoose";


const processAppName = (name) => {
  const pascal = pascalCase(name);
  return {
    original: name,
    originalCapital: name.charAt(0).toUpperCase() + name.slice(1),
    pascal: pascal,
    camel: camelCase(name),
    plural: pluralize(pascal),
    pluralLower: pluralize(name).toLowerCase(),
  };
};

const serializeSchema = (schema) => {
  return JSON.stringify(schema, (key, value) => {
    if (value === String) return 'String';
    if (value === Number) return 'Number';
    if (value === Boolean) return 'Boolean';
    if (value === Date) return 'Date';
    if (value === Buffer) return 'Buffer';
    if (Array.isArray(value)) return `[${value.map(v => v === String ? 'String' : JSON.stringify(v))}]`;
    if (value && value.type === mongoose.Schema.Types.ObjectId) return "{ type: mongoose.Schema.Types.ObjectId }";
    return value;
  }, 2).replace(/"String"/g, 'String')
    .replace(/"Number"/g, 'Number')
    .replace(/"Boolean"/g, 'Boolean')
    .replace(/"Date"/g, 'Date')
    .replace(/"Buffer"/g, 'Buffer')
    .replace(/"type": "mongoose.Schema.Types.ObjectId"/g, 'type: mongoose.Schema.Types.ObjectId');
};

export { processAppName, serializeSchema };
