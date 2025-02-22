import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/response.util.js";

const errorHandler = (err, req, res) => {
  console.error(err);
  return errorResponse(res, {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
};

export default errorHandler;
