import { login } from "./controllers/auth.controller.js";
import { 
  getAllApps, getAppById, createApp, updateApp, deleteApp 
} from "./controllers/apps.controller.js";
import {
  getAllSchemas, getSchemaById, createSchema, updateSchema, deleteSchema
} from "./controllers/schemas.controller.js";

class AdminApi {
  constructor(app) {
    this.app = app;
  }
  register() {
    console.log("Admin API registered");
    this.app.route("/api/admin/auth/login").post(login);

    this.app
      .route("/api/admin/apps/")
      .get(getAllApps)
      .post(createApp);

    this.app
      .route("/api/admin/apps/:id")
      .get(getAppById)
      .put(updateApp)
      .delete(deleteApp);

    this.app
      .route("/api/admin/apps/:id/schemas")
      .get(getAllSchemas)
      .post(createSchema);

    this.app
      .route("/api/admin/apps/:id/schemas/:schema_id")
      .get(getSchemaById)
      .put(updateSchema)
      .delete(deleteSchema);

    this.app
      .route("/api/admin/apps/:id/endpoints")
      .get(/* Get all endpoints */)
      .post(/* Create endpoint */);

    this.app
      .route("/api/admin/apps/:id/endpoints/:endpoint_id")
      .get(/* Get endpoint */)
      .put(/* Update endpoint */)
      .delete(/* Delete endpoint */);

    this.app
      .route("/api/admin/apps/:id/endpoints/:endpoint_id/auth")
      .put(/* Update auth settings */);

    this.app
      .route("/api/admin/apps/:id/endpoints/:endpoint_id/roles")
      .put(/* Update roles */);

    this.app.listen(2233);
  }
}

export default AdminApi;
