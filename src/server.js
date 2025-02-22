import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import corsConfig from "./configs/cors.config.js";
import router from "./router.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
import _404 from "./middlewares/404.middleware.js";
import log from "./middlewares/log.middleware.js";
import envConfig from "./configs/env.config.js";
import { connectDB } from "./utils/db.util.js";
import AdminApi from "../admin/apis/index.js";

connectDB(envConfig.mongoUri);

const app = express();

const adminApi = new AdminApi(app);
adminApi.register();

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

app.use("/api", router);
app.use(_404);
app.use(errorHandler);

app.listen(envConfig.port, () => {
  console.log(`Server is running on http://127.0.0.1:${envConfig.port}`);
});