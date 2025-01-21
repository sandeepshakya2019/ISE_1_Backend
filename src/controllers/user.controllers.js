import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

import uploadOnCloudinary from "../utils/cloudinary.utils.js";

import { User } from "../models/user.models.js";

const basicSetup = asyncHandler((req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "Welcome to API "));
});

const registerUser = asyncHandler(async (req, res) => {
  console.log("body", req.body);
  let errorMsg = {
    mobileNo: "",
    password: "",
    emailId: "",
    fullName: "",
    userError: "",
  };
  let isError = false;
  const { mobileNo, password, fullName, emailId } = req.body;

  if (!mobileNo) {
    errorMsg.mobileNo = "Mobile No is required";
    isError = true;
  } else {
    if (mobileNo.length < 10) {
      errorMsg.mobileNo = "Mobile No Should be greater then 10";
      isError = true;
    }
    if (mobileNo.length > 10) {
      errorMsg.mobileNo = "Mbile No Should be less then 10";
      isError = true;
    } else {
      if (isNaN(mobileNo)) {
        errorMsg.mobileNo = "Mobile No should be a digit";
        isError = true;
      }
    }
  }

  if (!fullName) {
    errorMsg.fullName = "Full Name is required";
    isError = true;
  } else {
    if (fullName.length < 4) {
      errorMsg.fullName = "Full Name Should be greater then 4 Characters";
      isError = true;
    }
  }

  if (emailId.length > 0) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailId)) {
      errorMsg.emailId = "Invalid Email Id";
      isError = true;
    }
  }

  // if (!password) {
  //   errorMsg.password = "Password is required";
  // }
  // if(!emailId){
  //   errorMsg.emailId = "Email Id is required";
  // }

  if (isError) {
    throw new ApiError(400, errorMsg);
    // res.status(400).json();
  } else {
    // check mobile no already exist
    // console.log(mobileNo, fullName, emailId);
    const existedUser = await User.findOne({
      $or: [{ mobileNo: mobileNo }, { emailId: emailId }],
    });

    if (existedUser) {
      errorMsg.userError = "[-] User Already Exists";
      throw new ApiError(400, errorMsg);
    } else {
      const user = new User({
        mobileNo,
        // password,
        fullName,
        emailId: emailId?.toLowerCase() || "",
      });
      // hashed password already in the pre method
      const savedUser = await user.save();
      console.log(savedUser);
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

const loginUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "[+] Login Successfully"));
});

const kycVerification = asyncHandler(async (req, res) => {
  console.log("Files", req.files);
  console.log("Body", req.body);

  let errorMsg = { livePhoto: "", aadharCardId: "", incomeCertificateId: "" };
  let isError = false;
  const livePhotoPath = req.files?.livePhoto?.[0]?.path;
  console.log(livePhotoPath);
  if (!livePhotoPath) {
    errorMsg.livePhoto = "Live Photo is required";
    throw new ApiError(400, errorMsg);
  }
  // upload on cloudinary
  const livePhoto = await uploadOnCloudinary(livePhotoPath);
  if (!livePhoto) {
    errorMsg.livePhoto = "Live Photo is required";
    throw new ApiError(400, errorMsg);
  }
  return res
    .status(201)
    .json(new ApiResponse(201, livePhoto, "[+] KYC verification Successfully"));
});

const bankVerification = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "[+] Bank Verifiication Successfully"));
});

export {
  basicSetup,
  registerUser,
  bankVerification,
  kycVerification,
  loginUser,
};
