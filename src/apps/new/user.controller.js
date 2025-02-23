import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../utils/response.util.js";
import User from "./User.model.js";

export const createUser = async(req, res, next) => {
  const { name } = req.body;
  const data = await User.create({ name });
  return successResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};


export const readUsers = async(req, res, next) => {
  const data = await User.find({});
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Users fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const readUser = async(req, res, next) => {
  const { id } = req.params;
  const data = await User.findById(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const updateUser = async(req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const data = await User.findByIdAndUpdate(id, { name });
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const deleteUser = async(req, res, next) => {
  const { id } = req.params;
  const data = await User.findByIdAndDelete(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User deleted successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};