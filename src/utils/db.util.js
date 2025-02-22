import mongoose from "mongoose";

export const connectDB = (uri) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(uri);
};