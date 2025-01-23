import { Router } from "express";
import {
  paymentController,
  QRCodeGenrator,
} from "../controllers/payment.controllers.js";
// import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/qrcode").post(QRCodeGenrator);
router.route("/do").post(paymentController);

export default router;
