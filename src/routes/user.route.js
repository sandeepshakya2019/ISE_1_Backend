import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";

const router = Router();

router.route("/").get(registerUser);
// http://localhost:3005/api/v1/users/register
http: router.route("/register").post(registerUser);
// http://localhost:3005/api/v1/users/login
router.route("/login").post(loginUser);

export default router;
