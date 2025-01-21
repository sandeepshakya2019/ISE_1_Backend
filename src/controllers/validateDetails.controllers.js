import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const aadharVerification = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "[+] Addhar Verified Successfully"));
});

const bankVerification = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "[+] Bank Verified Successfully"));
});

const rationVerification = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "[+] Ration Verified Successfully"));
});

const incomeVerification = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "[+] Income Verified Successfully"));
});

export {
  aadharVerification,
  rationVerification,
  bankVerification,
  incomeVerification,
};
