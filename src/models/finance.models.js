import mongoose from "mongoose";

const financeDetailsSchema = new mongoose.Schema(
  {
    financeEndDate: {
      type: Date,
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    loanid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },
  },
  { timestamps: true }
);

export const Finance = mongoose.model("Finance", financeDetailsSchema);
