export const successResponse = (res, { statusCode = 200, data, metadata }) => {
  return res.status(statusCode).json({
    status: "success",
    statusCode: statusCode,
    data: data ?? null,
    metadata: metadata ?? null,
  });
};

export const errorResponse = (res, { statusCode = 500, message, errorCode }) => {
  return res.status(statusCode).json({
    status: "error",
    statusCode,
    data: null,
    
    error: {
        code: errorCode ?? statusCode,
        message: message ?? "An error occurred",
    }
  });
}
