import mongoose from "mongoose";

const consultingSchema = new mongoose.Schema({
  type: String,
  name: String,
  tel: String,
  email: String,
  category: [{ type: String }],
  message: String,
  createdAt: Date,
});

const Consulting = mongoose.model("Consulting", consultingSchema);
export default Consulting;
