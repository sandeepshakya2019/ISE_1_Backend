import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

import uploadOnCloudinary from "../utils/cloudinary.utils.js";

import { User } from "../models/user.models.js";
import { Kyc } from "../models/kyc.models.js";
import {
  registerValidation,
  KYCValidate,
  validateLoginUser,
  ValidateUserAndOTP,
} from "../validations/user.validate.js";
import { sendOtp } from "../utils/sendOTP.utils.js";
import jwt from "jsonwebtoken";

const genrateAccessandRefreshToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accesst = user.generateToken();
    const refresht = user.refreshToken();
    user.rtoken = refresht;
    await user.save();
    return { accesst, refresht };
  } catch (error) {
    console.log("error", error);
    throw new ApiError(500, {
      userError: "Something Went Wrong while genrating access Tokens",
    });
  }
};

const basicSetup = asyncHandler((req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "Welcome to API "));
});

const registerUser = asyncHandler(async (req, res) => {
  const { mobileNo, fullName, emailId } = req.body;

  let isError = registerValidation(req.body);

  let errorMsg = { userError: "" };

  if (isError[0]) {
    throw new ApiError(400, isError[1]);
  } else {
    const existedUser = await User.findOne({
      $or: [{ mobileNo: mobileNo }, { emailId: emailId }],
    });

    if (existedUser) {
      errorMsg.userError = "[-] User Already Exists";
      throw new ApiError(400, errorMsg);
    } else {
      const user = new User({
        mobileNo,
        fullName,
        emailId: emailId?.toLowerCase() || "",
      });
      const savedUser = await user.save();
      if (savedUser) {
        return res
          .status(201)
          .json(new ApiResponse(201, user, "[+] User Registered Successfully"));
      } else {
        errorMsg.userError = "[-] Error in Saving User";
        throw new ApiError(500, errorMsg);
      }
    }
  }
});

const loginOTP = asyncHandler(async (req, res) => {
  let isError = validateLoginUser(req.body);
  let errorMsg = { userError: "" };
  if (isError[0]) {
    throw new ApiError(400, isError[1]);
  } else {
    let { mobileNo } = req.body;
    const user = await User.findOne({ mobileNo });
    if (!user) {
      errorMsg.userError = "[-] User Not Found";
      throw new ApiError(401, errorMsg);
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const result = await sendOtp(mobileNo, otp);

    if (result.success) {
      const result = await User.updateOne(
        { mobileNo },
        {
          otp,
          otpExpiresAt: Date.now() + 5 * 60 * 1000,
        }
      );
      if (result) {
        res
          .status(200)
          .json(new ApiResponse(200, {}, "[+] OTP Send Successfully"));
      } else {
        errorMsg.userError = "[-] Error in Saving OTP";
        throw new ApiError(500, errorMsg);
      }
    } else {
      errorMsg.userError = "[-] Error in Sending OTP";
      throw new ApiError(500, errorMsg);
    }
  }
});

const loginToken = asyncHandler(async (req, res) => {
  let isError = ValidateUserAndOTP(req.body);
  let errorMsg = { userError: "" };
  if (isError[0]) {
    throw new ApiError(400, isError[1]);
  } else {
    const { mobileNo, otp } = req.body;

    const user = await User.findOne({ mobileNo });
    if (!user) {
      errorMsg.userError = "[-] User Not Found";
      throw new ApiError(401, errorMsg);
    }

    if (user.otp !== Number(otp)) {
      errorMsg.userError = "[-] Invalid OTP";
      throw new ApiError(401, errorMsg);
    }

    if (user.otpExpiresAt < Date.now()) {
      errorMsg.userError = "[-] OTP Expired";
      throw new ApiError(401, errorMsg);
    }

    // remove the otp and otpExpiresAt
    await User.updateOne({ mobileNo }, { otp: null, otpExpiresAt: null });
    // access and refresh token

    const { accesst, refresht } = await genrateAccessandRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("refreshToken", refresht, options)
      .cookie("accessToken", accesst, options)
      .json(
        new ApiResponse(
          200,
          { user, refresht, accesst },
          "[+] Login Successfully"
        )
      );
  }
});

const logout = asyncHandler(async (req, res) => {
  const id = req.user._id;
  await User.findByIdAndUpdate(id, { $set: { rtoken: null } }, { new: true });
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, null, "[+] User Logout Successfully"));
});

const kycVerification = asyncHandler(async (req, res) => {
  console.log("Files", req.file);
  console.log("Body", req.body);
  console.log("User", req.user);

  let errorMsg = {
    livePhoto: "",
    userError: "",
  };
  const livePhotoPath = req.file?.path;

  if (!livePhotoPath) {
    errorMsg.livePhoto = "Live Photo is required";
    throw new ApiError(400, errorMsg);
  }
  let isError = KYCValidate(req.body);

  if (isError[0]) {
    throw new ApiError(400, isError[1]);
  }

  const livePhoto = await uploadOnCloudinary(
    livePhotoPath,
    req?.user?.mobileNo
  );

  if (!livePhoto) {
    errorMsg.livePhoto = "Upload Faild";
    throw new ApiError(400, errorMsg);
  }
  const { aadharCardId, accountNumber, ifscCode } = req.body;

  if (isError[0]) {
    throw new ApiError(400, isError[1]);
    // res.status(400).json();
  } else {
    const existedUser = await User.findById(req.user._id);

    if (existedUser) {
      // Kyc;
      const storedKyc = new Kyc({
        aadharCardId,
        accountNumber,
        ifscCode,
        photo: livePhoto.secure_url,
        userid: existedUser._id,
      });
      const savedKyc = await storedKyc.save();
      console.log(savedKyc);
      if (savedKyc) {
        return res
          .status(201)
          .json(new ApiResponse(201, savedKyc, "[+] KYC Saved Successfully"));
      } else {
        errorMsg.userError = "[-] Error in KYC Saving";
        throw new ApiError(500, errorMsg);
      }
    } else {
      errorMsg.userError = "[-] User Not Found";
      throw new ApiError(400, errorMsg);
    }
  }
});

const refreshLoginToken = asyncHandler(async (req, res) => {
  const incomeingtoken = req.cookies?.refreshToken || req.body.refreshToken;
  let errorMsg = {
    tokenError: "",
  };
  if (!incomeingtoken) {
    errorMsg.tokenError = "[-] Token is required";
    throw new ApiError(400, errorMsg);
  }
  const decoToken = jwt.verify(incomeingtoken, process.env.ACCESS_TOKEN_SECRET);
  if (!decoToken) {
    errorMsg.tokenError = "[-] Invalid Token";
    throw new ApiError(401, errorMsg);
  }
  const user = await User.findById(decoToken?._id);
  if (!user) {
    errorMsg.tokenError = "[-] User Not Found";
    throw new ApiError(401, errorMsg);
  }
  if (incomeingtoken !== user?.rtoken) {
    errorMsg.tokenError = "[-] Token Mismatch or Expired";
    throw new ApiError(401, errorMsg);
  }

  const { accesst, refresht } = await genrateAccessandRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refresht, options)
    .cookie("accessToken", accesst, options)
    .json(
      new ApiResponse(200, { refresht, accesst }, "[+] Access Token Refreshed")
    );
});

export {
  basicSetup,
  registerUser,
  kycVerification,
  loginOTP,
  loginToken,
  logout,
  refreshLoginToken,
};
