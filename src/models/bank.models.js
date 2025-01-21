import mongoose from "mongoose";

const bankDetailsSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{9,18}$/.test(v); // Validates account number length (9-18 digits)
        },
        message: (props) => `${props.value} is not a valid account number!`,
      },
    },
    ifscCode: {
      type: String,
      required: true,
      match: /^[A-Z]{4}0[A-Z0-9]{6}$/, // Validates IFSC format
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

export const Bank = mongoose.model("Bank", bankDetailsSchema);
