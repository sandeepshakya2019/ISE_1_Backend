import mongoose from "mongoose";

const kycSchema = new mongoose.Schema(
  {
    aadharCardId: {
      type: String,
      required: [true, "Aadhar ID is required"],
      trim: true,
    },
    rationCardId: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      required: [true, "Photo is required"],
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isOnline: {
      // enum: ["true", "false"],
      type: Boolean,
      default: false,
    },
    isOffline: {
      // enum: ["true", "false"],
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Kyc = mongoose.model("Kyc", kycSchema);
