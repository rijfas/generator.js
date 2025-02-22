import pluralize from "pluralize";
import { pascalCase, camelCase } from "change-case";

const processAppName = (name) => {
  const pascal = pascalCase(name);
  return {
    original: name,
    pascal: pascal,
    camel: camelCase(name),
    plural: pluralize(pascal),
    pluralLower: pluralize(name).toLowerCase(),
  };
};

export { processAppName };
