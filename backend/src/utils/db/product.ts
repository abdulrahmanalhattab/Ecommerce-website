import mongoose, { Schema } from "mongoose";

const Product = new Schema({
  id: { type: Number, unique: true, require: true },
  product: { type: String, require: true },
  description: { type: Object, default: [] },
  price: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  display: { type: String, default: "Public" },
  date: { type: Date, default: Date() },
  img: { type: String, default: "" },
  type: {type: String, default: ""}
});

export default mongoose.model("product", Product, "product");
