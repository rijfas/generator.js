import { createApp, getAllApps } from "./controllers/apps.controller.js";
import {
  createEntry,
  deleteEntry,
  getCollectionInfo,
  getCollections,
  updateEntry,
} from "./controllers/collection.controller.js";
import { getAllEndPoints } from "./controllers/endpoints.controller.js";
import {
  createSchema,
  getAllSchemas,
} from "./controllers/schemas.controller.js";

class AdminApi {
  constructor(app) {
    this.app = app;
  }
  register() {
    this.app.route("/api/admin/apps/").get(getAllApps).post(createApp);

    this.app
      .route("/api/admin/apps/:appName/schemas")
      .get(getAllSchemas)
      .post(createSchema);

    this.app.route("/api/admin/apps/:appName/endpoints").get(getAllEndPoints);

    this.app.route("/api/admin/apps/:app_name/collections").get(getCollections);

    this.app
      .route("/api/admin/collections/:collection_name")
      .get(getCollectionInfo)
      .post(createEntry);

    this.app
      .route("/api/admin/collections/:collection_name/:entry_id")
      .put(updateEntry)
      .delete(deleteEntry);

    this.app.listen(2233);
  }
}

export default AdminApi;
