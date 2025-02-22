import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../utils/response.util.js";
import Product from "./product.model.js";

export const createProduct = async(req, res, next) => {
  const { name, email, password, isAdmin, isActive, isBlocked, isDeleted } = req.body;
  const data = await Product.create({ name, email, password, isAdmin, isActive, isBlocked, isDeleted });
  return successResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Product created successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};


export const readProducts = async(req, res, next) => {
  const data = await Product.find({});
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Products fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const readProduct = async(req, res, next) => {
  const { id } = req.params;
  const data = await Product.findById(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Product fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const updateProduct = async(req, res, next) => {
  const { id } = req.params;
  const { name, email, password, isAdmin, isActive, isBlocked, isDeleted } = req.body;
  const data = await Product.findByIdAndUpdate(id, { name, email, password, isAdmin, isActive, isBlocked, isDeleted });
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Product updated successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const deleteProduct = async(req, res, next) => {
  const { id } = req.params;
  const data = await Product.findByIdAndDelete(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Product deleted successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};