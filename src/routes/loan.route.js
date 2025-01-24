import { Router } from "express";
import {
  accessLoan,
  getAllLoans,
  QRCodeGenrator,
  repayLoan,
} from "../controllers/loan.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getAll").get(auth, getAllLoans);
router.route("/access").post(auth, accessLoan);
// payment integration
router.route("/repay").post(auth, repayLoan);
router.route("/qrcode").post(auth, QRCodeGenrator);

export default router;
