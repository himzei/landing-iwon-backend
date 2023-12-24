import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
  title: { type: String },
  createdAt: Date,
  updatedAt: Date,
});

const Missions = mongoose.model("Missions", missionSchema);
export default Missions;
