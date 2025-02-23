import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../utils/response.util.js";
import Cat from "./Cat.model.js";

export const createCat = async(req, res, next) => {
  const { name } = req.body;
  const data = await Cat.create({ name });
  return successResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Cat created successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};


export const readCats = async(req, res, next) => {
  const data = await Cat.find({});
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Cats fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const readCat = async(req, res, next) => {
  const { id } = req.params;
  const data = await Cat.findById(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Cat fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const updateCat = async(req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const data = await Cat.findByIdAndUpdate(id, { name });
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Cat updated successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const deleteCat = async(req, res, next) => {
  const { id } = req.params;
  const data = await Cat.findByIdAndDelete(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Cat deleted successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};