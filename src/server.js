import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import AdminApi from "../admin/backend/index.js";
import corsConfig from "./configs/cors.config.js";
import envConfig from "./configs/env.config.js";
import _404 from "./middlewares/404.middleware.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
import log from "./middlewares/log.middleware.js";
import router from "./router.js";

connectDB(envConfig.mongoUri);

const app = express();

app.set("trust proxy", 1);
app.use(cors(corsConfig));

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(log);

const adminApi = new AdminApi(app);
adminApi.register();

app.use("/api", router);
app.use(_404);
app.use(errorHandler);

app.listen(envConfig.port, () => {
  console.log(`Server is running on http://127.0.0.1:${envConfig.port}`);
});
