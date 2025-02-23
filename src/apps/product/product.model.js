import mongoose from "mongoose";

const Product = new mongoose.Schema({
  "name": {
    "type": String
  }
},
{ timestamps: true }
);

export default mongoose.model("products", Product);