import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: String,
  tel: String,
  email: String,
  type: String,
  message: String,
  createdAt: Date,
});

const University = mongoose.model("University", universitySchema);
export default University;
