import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    refreshToken: {type: String, required: false}
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel;