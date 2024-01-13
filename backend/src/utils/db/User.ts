import mongoose, { Schema } from "mongoose";

const User = new Schema({
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  photo: { type: String, default: "" },
  language: { type: String, default: "en" },
  type: { type: String, default: "Member" },
  date: { type: Date, default: Date() },
});

export default mongoose.model("user", User, "user");
