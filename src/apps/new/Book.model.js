import mongoose from "mongoose";

const Book = new mongoose.Schema({
  "name": {
    "type": "string",
    "required": true
  },
  "age": {
    "type": "number",
    "required": true
  }
},
{ timestamps: true }
);

export default mongoose.model("books", Book);