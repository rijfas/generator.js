import mongoose from "mongoose";

const Thenga = new mongoose.Schema({
  "name": {
    "type": "string",
    "required": true
  },
  "age": {
    "type": "number",
    "required": false
  }
},
{ timestamps: true }
);

export default mongoose.model("thengas", Thenga);