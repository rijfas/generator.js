import { successResponse } from "../utils/response.util.js";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;
  // Implement your authentication logic here
  if(email === "admin@admin.com" && password === "admin") {
    return successResponse(res, {
      data: {
        token: jwt.sign({"user": "admin" }, process.env.JWT_SECRET, {})
      }
    });

  }
  return errorResponse(res, {
    message: "Invalid credentials",
    statusCode: StatusCodes.UNAUTHORIZED
  });
};