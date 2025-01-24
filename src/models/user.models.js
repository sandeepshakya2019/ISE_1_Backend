import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: String,
      unique: true,
      required: [true, "Mobile No is required"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number !!`,
      },
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    emailId: {
      type: String,
      unique: true,
      // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      lowercase: true,
      required: false,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid emiail id !!`,
      },
    },
    noOfLoan: {
      type: Number,
      default: 0,
    },
    sectionedAmount: {
      type: Number,
      default: 0,
    },
    offeredAmount: {
      type: Number,
      default: 10000,
    },
    isOtp: {
      type: Boolean,
      default: false,
    },
    rtoken: {
      type: String,
      required: false,
    },
    otp: {
      type: Number,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    isKYC: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseAggregatePaginate);

// Adding custom methods for jwt
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      mobileNo: this.mobileNo,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.refreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
