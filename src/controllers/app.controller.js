// general controller for the app like health and webhooks

import { StatusCodes } from "http-status-codes";
import { successResponse } from "../utils/response.util.js";

export const healthCheck = (req, res, next) => {
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    metadata: {
      timeStamp: new Date(),
    },
  });
};