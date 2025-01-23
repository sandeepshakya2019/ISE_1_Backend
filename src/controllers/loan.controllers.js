import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Loan } from "../models/loan.models.js";
import { User } from "../models/user.models.js";

const getAllLoans = asyncHandler(async (req, res) => {
  const { mobileNo } = req.body;
  if (!mobileNo || mobileNo.length !== 10) {
    throw new ApiError(400, { userError: "Invalid Mobile No" });
  }
  // databse call to get the loan from loan model
  const loans = await Loan.find({ mobileNo });
  return res
    .status(200)
    .json(new ApiResponse(200, loans, "[+] Loan Fetched Succcessfully"));
});

const accessLoan = asyncHandler(async (req, res) => {
  const { totalLoanAmount, loanReason } = req.body;
  const id = req.user._id;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(400, { userError: "Loan Not Found" });
  }
  if (totalLoanAmount <= user.offeredAmount) {
    user.offeredAmount -= totalLoanAmount;
    user.sectionedAmount += totalLoanAmount;
    // save in loan model
    const loan = new Loan({
      totalLoanAmount,
      loanReason,
      loanStatus: "Requested",
      user: user._id,
      paybackAmount: totalLoanAmount,
    });
    await loan.save();
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "[+] Loan Access Granted"));
  } else {
    throw new ApiError(400, { userError: "Insufficient Loan Amount" });
  }
});

const repayLoan = asyncHandler(async (req, res) => {
  const { totalLoanAmount, loanReason } = req.body;
  const id = req.user._id;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(400, { userError: "Loan Not Found" });
  }
  if (totalLoanAmount <= user.offeredAmount) {
    user.offeredAmount -= totalLoanAmount;
    user.sectionedAmount += totalLoanAmount;
    // save in loan model
    const loan = new Loan({
      totalLoanAmount,
      loanReason,
      loanStatus: "Requested",
      user: user._id,
      paybackAmount: totalLoanAmount,
    });
    await loan.save();
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "[+] Loan Access Granted"));
  } else {
    throw new ApiError(400, { userError: "Insufficient Loan Amount" });
  }
});

export { getAllLoans, accessLoan, repayLoan };
