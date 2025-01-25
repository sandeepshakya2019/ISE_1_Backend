import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Loan } from "../models/loan.models.js";
import { User } from "../models/user.models.js";
import stripe from "stripe";
import { totalLoans } from "../constants.js";
const strip = stripe(process.env.STRIPE_SECRET_KEY);

const getAllLoans = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      throw new ApiError(400, { userError: "Invalid User Request" });
    }
    // databse call to get the loan from loan model
    const loans = await Loan.find({ userid: id });
    return res
      .status(200)
      .json(new ApiResponse(200, loans, "[+] Loan Fetched Succcessfully"));
  } catch (error) {
    throw new ApiError(400, { userError: "Something Went Wrong in Get Loans" });
  }
});

const accessLoan = asyncHandler(async (req, res) => {
  try {
    const { totalLoanAmount, loanReason } = req.body;
    const id = req?.user?._id;
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(400, { userError: "User Not Found" });
    }
    if (totalLoanAmount <= user.offeredAmount) {
      user.noOfLoan = user.noOfLoan + 1;
      if (user.noOfLoan <= totalLoans) {
        user.offeredAmount -= Number(totalLoanAmount);
        user.sectionedAmount += Number(totalLoanAmount);
        // save in loan model
        const loan = new Loan({
          totalLoanAmount,
          loanReason,
          loanStatus: "Requested",
          userid: user._id,
          paybackAmount: totalLoanAmount,
        });
        await loan.save();
        await user.save();

        return res
          .status(200)
          .json(new ApiResponse(200, loan, "[+] Loan Access Granted"));
      } else {
        throw new ApiError(400, { userError: "Loan Limit Exceeded" });
      }
    } else {
      throw new ApiError(400, { userError: "Insufficient Loan Amount" });
    }
  } catch (error) {
    throw new ApiError(400, { userError: "Something Went Wrong" });
  }
});

const repayLoan = asyncHandler(async (req, res) => {
  const user = req.user;

  const { loanId } = req.body;
  try {
    const loan = await Loan.findByIdAndUpdate(
      loanId,
      { paybackAmount: 0, loanStatus: "Repaid" },
      { new: true }
    );
    if (!loan) {
      throw new ApiError(404, { userError: "Loan Not Found" });
    }
    user.sectionedAmount -= Number(loan.totalLoanAmount);
    user.offeredAmount += Number(loan.totalLoanAmount);
    user.noOfLoan = user.noOfLoan - 1;
    await user.save();
    await loan.save();
    return res
      .status(200)
      .json(new ApiResponse(200, loan, "[+] Loan Repaid Successfully"));
    // send the UPI payment link to the user
    // return res.json({ paymentLink: paymentUrl });
  } catch (error) {
    console.error("Error repaying loan:", error);
    throw new ApiError(404, { userError: "Something Went Wrong" });
  }
});

const QRCodeGenrator = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const upiId = "sandeepshakya2015-2@okicici";
  const paymentUrl = `upi://pay?pa=${upiId}&pn=&am=${amount}&cu=INR`;
  qrcode.toDataURL(paymentUrl, (err, url) => {
    if (err) {
      console.error("Error generating QR code:", err);
      return;
    }
    console.log("QR Code URL:", url);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { qrcodeurl: url },
          "[+] QR Code Genrated Successfully"
        )
      );
    // You can now use this URL to display the QR code on your webpage or app
  });
});

export { getAllLoans, accessLoan, repayLoan, QRCodeGenrator };
