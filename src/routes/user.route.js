import { Router } from "express";
import {
  loginUser,
  registerUser,
  kycVerification,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(registerUser);
// http://localhost:3005/api/v1/users/register
http: router.route("/register").post(registerUser);
// http://localhost:3005/api/v1/users/login
router.route("/login").post(loginUser);
router
  .route("/kyc")
  .post(upload.fields([{ name: "livePhoto", maxCount: 1 }]), kycVerification);

export default router;
