import { Router } from "express";
import {
  accessLoan,
  getAllLoans,
  QRCodeGenrator,
  repayLoan,
} from "../controllers/loan.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/getAll").get(upload.none(), auth, getAllLoans);
router.route("/access").post(upload.none(), auth, accessLoan);
// payment integration
router.route("/repay").post(upload.none(), auth, repayLoan);
router.route("/qrcode").post(upload.none(), auth, QRCodeGenrator);

export default router;
