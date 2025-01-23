import mongoose from "mongoose";

const paybackDetailsSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paybackAmount: {
      type: Number,
      default: 0,
    },
    paymentType: {
      type: String,
      required: true,
    },
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: false,
    },
  },
  { timestamps: true }
);

export const Payback = mongoose.model("Payback", paybackDetailsSchema);
