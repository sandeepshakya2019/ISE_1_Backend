import { Router } from "express";
import {
  registerUser,
  kycVerification,
  basicSetup,
  bankVerification,
  loginToken,
  loginOTP,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(basicSetup);

// http://localhost:3005/api/v1/users/register
router.route("/register").post(upload.none(), registerUser);

// http://localhost:3005/api/v1/users/login
router.route("/login-otp").post(upload.none(), loginOTP);
router.route("/login-token").post(upload.none(), loginToken);

// http://localhost:3005/api/v1/users/kyc
router.route("/kyc").post(upload.single("livePhoto"), kycVerification);

// http://localhost:3005/api/v1/users/bank
router.route("/bank").post(upload.none(), bankVerification);

export default router;
