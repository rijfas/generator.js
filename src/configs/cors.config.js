import envConfig from "./env.config.js";

const corsConfig = {
  origin(origin, callback) {
    const whitelist = envConfig.whitelist;
    const isDevelopment = envConfig.mode === "development";

    if (!origin && isDevelopment) {
      // for mobile app and postman client
      return callback(null, true);
    }

    if (whitelist.indexOf(origin) !== -1 || isDevelopment) {
      callback(null, true);
    } else {
      console.log(origin, "origin");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default corsConfig;
