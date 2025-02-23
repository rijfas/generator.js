import mongoose from "mongoose";

const User = new mongoose.Schema({
  "name": {
    "type": "string",
    "required": true
  }
},
{ timestamps: true }
);

export default mongoose.model("users", User);