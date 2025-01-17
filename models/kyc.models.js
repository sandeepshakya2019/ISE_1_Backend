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
    incomeCertificateId: {
      type: String,
      required: [true, "Income Certificate ID is required"],
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
  },
  { timestamps: true }
);

export const Kyc = mongoose.model("Kyc", kycSchema);
