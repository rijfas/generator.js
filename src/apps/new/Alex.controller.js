import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../utils/response.util.js";
import Alex from "./Alex.model.js";

export const createAlex = async(req, res, next) => {
  const { name } = req.body;
  const data = await Alex.create({ name });
  return successResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Alex created successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};


export const readAlexs = async(req, res, next) => {
  const data = await Alex.find({});
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Alexs fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const readAlex = async(req, res, next) => {
  const { id } = req.params;
  const data = await Alex.findById(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Alex fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const updateAlex = async(req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const data = await Alex.findByIdAndUpdate(id, { name });
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Alex updated successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const deleteAlex = async(req, res, next) => {
  const { id } = req.params;
  const data = await Alex.findByIdAndDelete(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Alex deleted successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};