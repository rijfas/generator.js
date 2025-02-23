import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../utils/response.util.js";
import Userss from "./Userss.model.js";

export const createUserss = async(req, res, next) => {
  const { name } = req.body;
  const data = await Userss.create({ name });
  return successResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Userss created successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};


export const readUsersss = async(req, res, next) => {
  const data = await Userss.find({});
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Usersss fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const readUserss = async(req, res, next) => {
  const { id } = req.params;
  const data = await Userss.findById(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Userss fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const updateUserss = async(req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const data = await Userss.findByIdAndUpdate(id, { name });
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Userss updated successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const deleteUserss = async(req, res, next) => {
  const { id } = req.params;
  const data = await Userss.findByIdAndDelete(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Userss deleted successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};