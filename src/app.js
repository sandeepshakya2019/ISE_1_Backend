import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(
  express.json({
    limit: "256kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "256kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// (err, req, res, next)

// import routes
import userRouter from "./routes/user.route.js";
import validateRouter from "./routes/validate.route.js";
import loanRoute from "./routes/loan.route.js";
import profileRoute from "./routes/profile.route.js";

app.use("/api/v1/users", userRouter);

app.use("/api/v1/validate", validateRouter);

app.use("/api/v1/loan", loanRoute);
app.use("/api/v1/profile", profileRoute);

// app.use("/api/v1/finance", validateRouter);

export { app };
