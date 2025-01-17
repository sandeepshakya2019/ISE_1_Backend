import mongoose from "mongoose";

const loanDetailsSchema = new mongoose.Schema(
  {
    loanAmount: {
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
  },
  { timestamps: true }
);

export const Loan = mongoose.model("Loan", loanDetailsSchema);
