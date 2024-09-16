import mongoose, { Document, Schema } from "mongoose";
import { IInterest } from "../types/types";

interface IInterestDocument extends IInterest, Document {}

const InterestSchema: Schema<IInterestDocument> = new mongoose.Schema<IInterestDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interests: [{
    type: String,
  }],
});

const Interest = mongoose.model<IInterestDocument>("Interest", InterestSchema);
export default Interest;
