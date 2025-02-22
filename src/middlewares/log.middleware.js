import logger from "../utils/log.uril.js";

const logMiddleware = (req, res, next) => {
    const { method, originalUrl } = req;
    const token = req.headers?.authorization?.split(" ")[1];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger.info({
        method,
        originalUrl,
        token,
        ip,
    });
    next();
};

export default logMiddleware