import { Router } from "express";
import { getAllDetails } from "../controllers/profile.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(auth, getAllDetails);

export default router;
