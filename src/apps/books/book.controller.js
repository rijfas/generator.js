import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../utils/response.util.js";
import Book from "./Book.model.js";

export const createBook = async(req, res, next) => {
  const { name, price } = req.body;
  const data = await Book.create({ name, price });
  return successResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Book created successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};


export const readBooks = async(req, res, next) => {
  const data = await Book.find({});
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Books fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const readBook = async(req, res, next) => {
  const { id } = req.params;
  const data = await Book.findById(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Book fetched successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const updateBook = async(req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const data = await Book.findByIdAndUpdate(id, { name, price });
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Book updated successfully",
    data: data,
    metadata: {
      timeStamp: new Date(),
    },
  });
};

export const deleteBook = async(req, res, next) => {
  const { id } = req.params;
  const data = await Book.findByIdAndDelete(id);
  return successResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Book deleted successfully",
    metadata: {
      timeStamp: new Date(),
    },
  });
};