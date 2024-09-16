import mongoose, { Document, Schema } from "mongoose";
import { IFollower } from "../types/types";

interface IFollowerDocument extends IFollower, Document {}

const FollowerSchema: Schema<IFollowerDocument> = new mongoose.Schema<IFollowerDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

const Follower = mongoose.model<IFollowerDocument>("Follower", FollowerSchema);
export default Follower;
