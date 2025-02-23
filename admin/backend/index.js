import { createApp, getAllApps } from "./controllers/apps.controller.js";
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

    this.app.listen(2233);
  }
}

export default AdminApi;
