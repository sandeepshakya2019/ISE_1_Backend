import { Router } from "express";
import {
  registerUser,
  kycVerification,
  basicSetup,
  loginToken,
  loginOTP,
  logout,
  loginCheck,
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

router.route("/login-check").get(upload.none(), auth, loginCheck);

// Secured Routes
router.route("/logout").post(upload.none(), auth, logout);
router.route("/kyc").post(upload.single("livePhoto"), auth, kycVerification);
//
export default router;
