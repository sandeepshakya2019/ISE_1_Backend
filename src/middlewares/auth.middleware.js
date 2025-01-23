import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import jwt from "jsonwebtoken";

export const auth = asyncHandler(async (req, res, next) => {
  try {
    const refreshTokesn =
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!refreshTokesn) {
      throw new ApiError(401, { userError: "No Refresh token" });
    }

    const decodeToken = await jwt.verify(
      refreshTokesn,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!decodeToken) {
      throw new ApiError(403, { userError: "Invalid Refresh token" });
    }
    const user = await User.findById(decodeToken?._id);
    if (!user) {
      throw new ApiError(404, { userError: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, { userError: "Invalid Refresh token Error" });
  }
  //   const accessToken = jwt.sign(
  //     { _id: user._id },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     { expiresIn: "15m" }
  //   );
  //   res.cookie("accessToken", accessToken, { expiresIn: "15m" });
  //   res.json({ accessToken });
  //   next();
  // const accessToken = generateAccessToken(user);
  // res.json({ accessToken });
  // next();
  // res.status(200).json({ message: "Logged In Successfully" });
  // res.cookie("refreshToken", refreshToken, { expiresIn: "7d" });
  // res.json({ message: "Logged In Successfully" });
});
