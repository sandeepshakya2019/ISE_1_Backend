import { logout } from "../controllers/user.controllers.js";
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

    const decodeToken = jwt.verify(
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
    if (!user.rtoken) {
      // lopgout the
      res.clearCookie("refreshToken");
      logout();
      throw new ApiError(401, { userError: "Refresh token expired" });
    } else {
      next();
    }
  } catch (error) {
    throw new ApiError(401, { userError: "Invalid Refresh token Error" });
  }
});
