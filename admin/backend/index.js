import { login } from "./auth.controller.js";

class AdminApi {
  constructor(app) {
    this.app = app;
  }
  register() {
    console.log("Admin API registered");
    this.app.route("/api/admin/auth/login").post(login);

    this.app
      .route("/api/admin/apps/")
      .get(/* Get all apps */)
      .post(/* Create app */);

    this.app
      .route("/api/admin/apps/:id")
      .get(/* Get app by id */)
      .put(/* Update app by id */)
      .delete(/* Delete app by id */);

    this.app
      .route("/api/admin/apps/:id/schemas")
      .get(/* Get all schemas */)
      .post(/* Create schema */);

    this.app
      .route("/api/admin/apps/:id/schemas/:schema_id")
      .get(/* Get schema */)
      .put(/* Update schema */)
      .delete(/* Delete schema */);

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
