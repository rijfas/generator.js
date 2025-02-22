import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/response.util.js";

const validator = (validationSchema, type) => {
  return async (req, res, next) => {
    // access the object based on the type
    let data;
    switch (type) {
      case "query":
        data = req.query;
        break;
      case "params":
        data = req.params;
        break;
      default:
        data = req.body;
        break;
    }
    let Schema;
    if (typeof validationSchema === "function") {
      Schema = await validationSchema();
    } else {
      Schema = validationSchema;
    }
    const { value, error } = Schema.validate(data);
    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      return errorResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        message,
      });
    }
    // submit the validated object based on the type
    switch (type) {
      case "query":
        req.query = value;
        break;
      case "params":
        req.params = value;
        break;
      default:
        req.body = value;
        break;
    }
    return next();
  };
};

export default validator;
