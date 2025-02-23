import mongoose from "mongoose";

const Alex = new mongoose.Schema({
  "name": {
    "type": "string",
    "required": true
  }
},
{ timestamps: true }
);

export default mongoose.model("alexes", Alex);