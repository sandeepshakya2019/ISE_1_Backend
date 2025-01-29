import { logout } from "../controllers/user.controllers.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import jwt from "jsonwebtoken";

export const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const accessToken = token?.replace("Bearer ", "");

    if (!accessToken) {
      throw new ApiError(401, { userError: "No Refresh token" });
    }

    // Verify the refresh token
    try {
      const decodeToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      // Retrieve the user based on the decoded token's ID
      const user = await User.findById(decodeToken._id);
      if (!user) {
        throw new ApiError(404, { userError: "User not found" });
      }
      // Check if the refresh token exists on the user document
      if (!user.atoken) {
        throw new ApiError(401, { userError: "Token expired" });
      }

      req.user = user; // Attach user to request object
      next(); // Continue to the next middleware or route handler
    } catch (jwtError) {
      throw new ApiError(403, {
        userError: "Invalid or Expired Token",
        systemError: jwtError,
      });
    }
  } catch (error) {
    console.log("Auth Error:", error); // Keep this for debugging purposes.
    throw new ApiError(401, {
      userError: "Authentication Error",
      systemError: error,
    });
  }
});
