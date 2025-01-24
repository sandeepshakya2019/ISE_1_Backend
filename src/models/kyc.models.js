import mongoose from "mongoose";

const kycSchema = new mongoose.Schema(
  {
    aadharCardId: {
      type: String,
      required: [true, "Aadhar ID is required"],
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
      // validate: {
      //   validator: function (v) {
      //     return /^\d{9,18}$/.test(v); // Validates account number length (9-18 digits)
      //   },
      //   message: (props) => `${props.value} is not a valid account number!`,
      // },
    },
    ifscCode: {
      type: String,
      required: true,
      trim: true,
      // match: /^[A-Z]{4}0[A-Z0-9]{6}$/, // Validates IFSC format
    },
    photo: {
      type: String,
      trim: true,
      required: [true, "Photo is required"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
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
