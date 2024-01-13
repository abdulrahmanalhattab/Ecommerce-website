import mongoose, { Schema } from "mongoose";

const Session = new Schema({
  token: { type: String, require: true },
  email: { type: String, require: true },
  session: { type: String, require: true, unique: true },
  date: { type: Date, default: Date() },
  status: { type: Boolean, default: true },
});

export default mongoose.model("session", Session, "session");
