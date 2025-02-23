import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/response.util.js";
import jwt from "jsonwebtoken";

const authCheck = () => {
    return async (req, res, next) => {
        try{
            const authHeader = req.headers.authorization;
    
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return errorResponse(res, {
                    statusCode: StatusCodes.UNAUTHORIZED,
                    message: "Token is missing or invalid",
                });
            }
        
            const token = authHeader.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
            req.user = decodedToken;
            next();
        }catch(error){
            console.error("Error verifying token:", error);
            return errorResponse(res, {
                statusCode: StatusCodes.UNAUTHORIZED,
                message: "Token is missing or invalid",
            });
        }
    };
};

export default authCheck;