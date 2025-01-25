import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Loan } from "../models/loan.models.js";
import { User } from "../models/user.models.js";
import { Payback } from "../models/payback.models.js";
import { Kyc } from "../models/kyc.models.js";

const getAllDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    const userdetails = await User.findById(id);
    const loandetails = await Loan.find({ userid: id });
    const paybackdetails = await Payback.find({ userid: id });
    const kycDetaiils = await Kyc.find({ userid: id });

    const result = { userdetails, loandetails, paybackdetails, kycDetaiils };

    res
      .status(200)
      .json(new ApiResponse(200, result, "[+] Details Fetched Successfully"));
  } catch (error) {
    const errorMsg = {};
    errorMsg.serverError = "[-] Error in Fetching Details";
    throw new ApiError(500, errorMsg); // Server Error 500
  }
});

export { getAllDetails };
