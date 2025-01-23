import { Router } from "express";
import {
  registerUser,
  kycVerification,
  basicSetup,
  loginToken,
  loginOTP,
  logout,
  refreshLoginToken,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(basicSetup);

// http://localhost:3005/api/v1/users/register
router.route("/register").post(upload.none(), registerUser);

// http://localhost:3005/api/v1/users/login
router.route("/login-otp").post(upload.none(), loginOTP);
router.route("/login-token").post(upload.none(), loginToken);

// Secured Routes
router.route("/refresh-token").post(upload.none(), auth, refreshLoginToken);

router.route("/logout").post(upload.none(), auth, logout);

// http://localhost:3005/api/v1/users/kyc
router.route("/kyc").post(upload.single("livePhoto"), auth, kycVerification);

export default router;
