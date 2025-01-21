import { Router } from "express";
import {
  loginUser,
  registerUser,
  kycVerification,
  basicSetup,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(basicSetup);
// http://localhost:3005/api/v1/users/register
router.route("/signup").post(upload.none(), registerUser);
// http://localhost:3005/api/v1/users/login
router.route("/login").post(upload.none(), loginUser);
router
  .route("/kyc")
  .post(upload.fields([{ name: "livePhoto", maxCount: 1 }]), kycVerification);

export default router;
