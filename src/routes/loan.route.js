import { Router } from "express";
import { accessLoan, getAllLoans } from "../controllers/loan.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getAll").post(auth, getAllLoans);
router.route("/access").post(auth, accessLoan);

export default router;
