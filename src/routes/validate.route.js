import { Router } from "express";
import {
  aadharVerification,
  bankVerification,
  rationVerification,
  incomeVerification,
} from "../controllers/specialvalidate.controllers.js";
// import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/aadhar-validate").post(aadharVerification);
router.route("/bank-validate").post(bankVerification);
router.route("/ration-validate").post(rationVerification);
router.route("/income-validate").post(incomeVerification);

export default router;
