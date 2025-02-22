import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/response.util.js";

const _404 = (req, res) => {
  return errorResponse(res, {
    statusCode: StatusCodes.NOT_FOUND,
    message: "Resource not found",
  });
};

export default _404;
