import mongoose from "mongoose";

const loanDetailsSchema = new mongoose.Schema(
  {
    totalLoanAmount: {
      type: Number,
      required: true,
    },
    loanReason: {
      type: String,
      required: true,
    },
    loanStatus: {
      // enum "Pending", "Completed", "Rejected"
      type: String,
      default: "Pending",
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    leftAmount: {
      type: Number,
      default: 0,
    },
    paybackAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Loan = mongoose.model("Loan", loanDetailsSchema);
