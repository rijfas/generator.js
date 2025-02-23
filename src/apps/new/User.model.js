import mongoose from "mongoose";

const User = new mongoose.Schema({
  "name": "string",
  "age": "number"
},
{ timestamps: true }
);

export default mongoose.model("users", User);