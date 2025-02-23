import mongoose from "mongoose";

const Cat = new mongoose.Schema({
  "name": {
    "type": "string",
    "required": true
  }
},
{ timestamps: true }
);

export default mongoose.model("cats", Cat);