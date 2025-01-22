import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

import uploadOnCloudinary from "../utils/cloudinary.utils.js";

import { User } from "../models/user.models.js";
import { Kyc } from "../models/kyc.models.js";
import {
  registerValidation,
  KYCValidate,
  bankValidate,
} from "../validations/user.validate.js";
import { Bank } from "../models/bank.models.js";

const basicSetup = asyncHandler((req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "Welcome to API "));
});

const registerUser = asyncHandler(async (req, res) => {
  const { mobileNo, password, fullName, emailId } = req.body;

  let isError = registerValidation(req.body);

  let errorMsg = { userError: "" };
  console.log(isError);
  if (isError[0]) {
    throw new ApiError(400, isError[1]);
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
  console.log("Files", req.file);
  console.log("Body", req.body);

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
    req?.body?.userMobileNo
  );

  if (!livePhoto) {
    errorMsg.livePhoto = "Upload Faild";
    throw new ApiError(400, errorMsg);
  }

  if (isError[0]) {
    throw new ApiError(400, isError[1]);
    // res.status(400).json();
  } else {
    const existedUser = await User.findOne({
      $or: [{ mobileNo: req.body.userMobileNo }],
    });

    if (existedUser) {
      // Kyc;
      const storedKyc = new Kyc({
        aadharCardId,
        rationCardId,
        incomeCertificateId,
        photo: livePhoto,
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

const bankVerification = asyncHandler(async (req, res) => {
  const isError = bankValidate(req.body);
  const { mobileNo, accountNumber, ifscCode } = req.body;
  if (isError[0]) {
    throw new ApiError(400, isError[1]);
    // res.status(400).json();
  } else {
    if (isError[0]) {
      throw new ApiError(400, isError[1]);
      // res.status(400).json();
    } else {
      const existedUser = await User.findOne({
        $or: [{ mobileNo: mobileNo }],
      });

      if (existedUser) {
        // Kyc;
        const storedBank = new Bank({
          accountNumber,
          ifscCode,
          userid: existedUser._id,
        });
        const savedBank = await storedBank.save();
        console.log(savedBank);
        if (savedBank) {
          return res
            .status(201)
            .json(
              new ApiResponse(201, savedBank, "[+] Bank Saved Successfully")
            );
        } else {
          errorMsg.userError = "[-] Error in Bank Saving";
          throw new ApiError(500, errorMsg);
        }
      } else {
        errorMsg.userError = "[-] User Not Found";
        throw new ApiError(400, errorMsg);
      }
    }
  }
});

export {
  basicSetup,
  registerUser,
  bankVerification,
  kycVerification,
  loginUser,
};
