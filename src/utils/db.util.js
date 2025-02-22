import mongoose from "mongoose";

export const connectDB = (uri) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(uri).then(() => {
    console.log("Database connected");
  }
  ).catch((err) => {
    console.log(err);
  });
};