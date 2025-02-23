import { camelCase, pascalCase } from "change-case";
import ejs from "ejs";
import fs from "fs/promises";
import path from "path";
import pluralize from "pluralize";

class GeneratorEngine {
  static instance = null;

  constructor() {
    if (GeneratorEngine.instance) {
      return GeneratorEngine.instance;
    }
    this.projectRoot = path.resolve(process.cwd(), "../");
    this.appsDirectory = path.join(this.projectRoot, "src", "apps");
    this.templatesDirectory = `${process.cwd()}/engine/templates`;
    GeneratorEngine.instance = this;
  }

  static getInstance() {
    if (!GeneratorEngine.instance) {
      GeneratorEngine.instance = new GeneratorEngine();
    }
    return GeneratorEngine.instance;
  }

  async ensureDirectoryExists(dirPath) {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }

  formatName(name) {
    const pascal = pascalCase(name);
    return {
      original: name,
      originalCapital: name.charAt(0).toUpperCase() + name.slice(1),
      pascal: pascal,
      camel: camelCase(name),
      plural: pluralize(pascal),
      pluralLower: pluralize(name).toLowerCase(),
    };
  }

  async getApps() {
    try {
      const apps = await fs.readdir(this.appsDirectory);
      return apps.filter((app) => {
        return fs
          .stat(path.join(this.appsDirectory, app))
          .then((stat) => stat.isDirectory());
      });
    } catch (error) {
      throw new Error(`Failed to get apps: ${error.message}`);
    }
  }

  async createApp(appName) {
    const appPath = path.join(this.appsDirectory, appName);
    console.log(appPath);

    try {
      await this.ensureDirectoryExists(appPath);
      return true;
    } catch (error) {
      throw new Error(`Failed to create app ${appName}: ${error.message}`);
    }
  }

  async addSchema(appName, schemaName, jsonSchema) {
    const appPath = path.join(this.appsDirectory, appName);
    const modelName = this.formatName(schemaName);

    try {
      const files = {
        model: {
          template: "model.ejs",
          output: `${modelName.pascal}.model.js`,
          data: {
            modelName,
            collectionSchema: JSON.stringify(jsonSchema, null, 2),
          },
        },
        controller: {
          template: "controller.ejs",
          output: `${schemaName}.controller.js`,
          data: {
            modelName,
            createBody: Object.keys(jsonSchema).join(", "),
            updateBody: Object.keys(jsonSchema).join(", "),
          },
        },
        router: {
          template: "router.ejs",
          output: `${schemaName}.router.js`,
          data: { modelName },
        },
      };

      for (const [type, config] of Object.entries(files)) {
        const templatePath = path.join(
          this.templatesDirectory,
          config.template
        );
        const outputPath = path.join(appPath, config.output);

        const template = await fs.readFile(templatePath, "utf-8");
        const rendered = ejs.render(template, config.data);
        await fs.writeFile(outputPath, rendered);
      }

      return true;
    } catch (error) {
      throw new Error(`Failed to add schema for ${appName}: ${error.message}`);
    }
  }

  async modifySchema(appName, schemaName, jsonSchema) {
    try {
      await this.deleteSchema(appName, schemaName);
      await this.addSchema(appName, schemaName, jsonSchema);
      return true;
    } catch (error) {
      throw new Error(
        `Failed to modify schema for ${appName}: ${error.message}`
      );
    }
  }

  async deleteSchema(appName, schemaName) {
    const appPath = path.join(this.appsDirectory, appName);
    const files = [
      `${schemaName}.model.js`,
      `${schemaName}.controller.js`,
      `${schemaName}.router.js`,
    ];

    try {
      await Promise.all(
        files.map((file) =>
          fs.unlink(path.join(appPath, file)).catch((err) => {
            if (err.code !== "ENOENT") throw err;
          })
        )
      );
      return true;
    } catch (error) {
      throw new Error(
        `Failed to delete schema for ${appName}: ${error.message}`
      );
    }
  }

  async getEndpoints(appName) {
    const appPath = path.join(this.appsDirectory, appName);
    try {
      const files = await fs.readdir(appPath);
      const routerFiles = files.filter((file) => file.endsWith(".router.js"));

      const endpoints = [];
      for (const routerFile of routerFiles) {
        const routerContent = await fs.readFile(
          path.join(appPath, routerFile),
          "utf-8"
        );
        const routes =
          routerContent.match(
            /router\.(get|post|put|delete)\(['"](.*?)['"]/g
          ) || [];
        endpoints.push(
          ...routes.map((route) => {
            const [, method, path] =
              route.match(/router\.(get|post|put|delete)\(['"](.*?)['"]/) || [];
            return { method: method.toUpperCase(), path: path };
          })
        );
      }
      return endpoints;
    } catch (error) {
      throw new Error(
        `Failed to get endpoints for ${appName}: ${error.message}`
      );
    }
  }
}

export default GeneratorEngine;
