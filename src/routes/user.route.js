import { Router } from "express";
import {
  loginUser,
  registerUser,
  kycVerification,
  basicSetup,
  bankVerification,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(basicSetup);
// http://localhost:3005/api/v1/users/register
router.route("/register").post(upload.none(), registerUser);
// http://localhost:3005/api/v1/users/login
router.route("/login").post(upload.none(), loginUser);
// http://localhost:3005/api/v1/users/kyc
router.route("/kyc").post(upload.single("livePhoto"), kycVerification);
// http://localhost:3005/api/v1/users/bank
router.route("/bank").post(upload.none(), bankVerification);

export default router;
