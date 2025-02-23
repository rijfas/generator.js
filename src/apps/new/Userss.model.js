import mongoose from "mongoose";

const Userss = new mongoose.Schema({
  "name": {
    "type": "string",
    "required": true
  }
},
{ timestamps: true }
);

export default mongoose.model("usersses", Userss);