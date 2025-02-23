import { StatusCodes } from "http-status-codes";
import firebaseAdmin from "../configs/firebase.config.js";
import { errorResponse } from "../utils/response.util.js";

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
        
            const idToken = authHeader.split(" ")[1];
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        
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