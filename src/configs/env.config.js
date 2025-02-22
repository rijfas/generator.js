const envConfig = {
    whitelist: process.env.WHITELIST?.split(",") ?? [],
    port: process.env.PORT ?? 5000,
    mode: process.env.NODE_ENV ?? "development",
    mongoUri: process.env.MONGO_URI,
};

export default envConfig;