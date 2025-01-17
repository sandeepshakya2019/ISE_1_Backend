import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: String,
      required: [true, "Mobile No is required"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    emailId: {
      type: String,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      lowercase: true,
      required: false,
    },
    isKYC: {
      type: Boolean,
      default: false,
    },
    kycDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kyc",
      required: true,
    },
    bankDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: true,
    },
    loanDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan",
      },
    ],
    financeDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Finance",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
