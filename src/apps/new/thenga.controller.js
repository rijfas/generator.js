import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../utils/response.util.js";
import Thenga from "./Thenga.model.js";

export const createThenga = async(req, res, next) => {
  const { name, age } = req.body;
  const data = await Thenga.create({ name, age });
  return successResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Thenga created successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};


export const readThengas = async(req, res, next) => {
  const data = await Thenga.find({});
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Thengas fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const readThenga = async(req, res, next) => {
  const { id } = req.params;
  const data = await Thenga.findById(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Thenga fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const updateThenga = async(req, res, next) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const data = await Thenga.findByIdAndUpdate(id, { name, age });
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Thenga updated successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const deleteThenga = async(req, res, next) => {
  const { id } = req.params;
  const data = await Thenga.findByIdAndDelete(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Thenga deleted successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};