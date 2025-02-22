import mongoose from "mongoose";

const Product = new mongoose.Schema({
  "name": {
    "type": String
  },
  "email": {
    "type": String,
    "required": true,
    "unique": true
  },
  "password": {
    "type": String,
    "required": true
  },
  "isAdmin": {
    "type": Boolean,
    "default": false
  },
  "isActive": {
    "type": Boolean,
    "default": false
  },
  "isBlocked": {
    "type": Boolean,
    "default": false
  },
  "isDeleted": {
    "type": Boolean,
    "default": false
  }
},
{ timestamps: true }
);

export default mongoose.model("products", Product);