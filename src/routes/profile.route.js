import { Router } from "express";
import { getAllDetails } from "../controllers/profile.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(auth, getAllDetails);

export default router;
