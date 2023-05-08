import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  
  },{timestamps: true }
);
const User = mongoose.model('User', clientSchema);
export default User;