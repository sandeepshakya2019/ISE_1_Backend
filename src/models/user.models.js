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
    // password: {
    //   type: String,
    //   required: true,
    //   minlength: [8, "Password must be at least 8 characters"],
    // },
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
    refreshToken: {
      type: String,
      required: false,
    },
    // userName:{
    //   type: String,
    //   unique: true,
    //   required: [true, "User Name is required"],
    // }
    // isKYC: {
    //   type: Boolean,
    //   default: false,
    // },
    // kycDetails: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Kyc",
    //   required: true,
    // },
    // bankDetails: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Bank",
    //   required: true,
    // },
    // loanDetails: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Loan",
    //   },
    // ],
    // financeDetails: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Finance",
    //   },
    // ],
  },
  { timestamps: true }
);

userSchema.plugin(mongooseAggregatePaginate);

// // jwt is bearer token
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// userSchema.methods.isPasswordCorrect = async function (pass) {
//   return await bcrypt.compare(pass, this.password);
// };

// Adding custom methods for jwt
userSchema.methods.generateToken = async function () {
  jwt.sign(
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

userSchema.methods.RefreshToken = async function () {
  jwt.sign(
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
