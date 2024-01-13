import mongoose, {Schema} from "mongoose";
const token = new Schema({
    email: {type: String, require: true, unique: true},
    token: {type: String, require: true, unique: true},
    date: {type: Date, default: Date()}

})

export default mongoose.model("token", token, "token");