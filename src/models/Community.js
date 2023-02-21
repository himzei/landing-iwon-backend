import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  title: String,
  company: String,
  contents: String,
  createdAt: Date,
});

const Community = mongoose.model("Community", communitySchema);
export default Community;
