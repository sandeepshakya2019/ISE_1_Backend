import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Loan } from "../models/loan.models.js";
import { User } from "../models/user.models.js";
import { Payback } from "../models/payback.models.js";

const getAllDetails = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const userdetails = await User.findById(id);
  const loandetails = await Loan.findById(id);
  const paybackdetails = await Payback.findById(id);

  const result = { userdetails, loandetails, paybackdetails };

  res
    .status(200)
    .json(new ApiResponse(200, result, "[+] Details Fetched Successfully"));
});

export { getAllDetails };
