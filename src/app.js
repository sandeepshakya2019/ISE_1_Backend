import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
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
import validateRouter from "./routes/validateDetails.route.js";

app.use("/", userRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/validate", validateRouter);

export { app };
