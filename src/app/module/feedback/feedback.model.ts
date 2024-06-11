import { Schema, model } from "mongoose";
import { FeedbackModel, IFeedBack } from "./feedback.interface";

// feedback schema------------
const feedbackSchema = new Schema<IFeedBack, FeedbackModel>(
  {
    reason: {
      type: String,
      required: [true, "Reason Is required"]
    },
    email: {
      type: String,
      required: [true, "email Is required"]
    },
    message: {
      type: String,
      required: [true, "Massage Is required"]
    },
    status: {
      type: String,
      default: "Pending"
    },
    file: {
      type: String
    },
    key: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const Feedback = model<IFeedBack, FeedbackModel>(
  "Feedback",
  feedbackSchema
);
