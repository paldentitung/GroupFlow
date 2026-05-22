// app.js
import express from "express";
import cors from "cors";
import ProjectsRoute from "./routes/projects.route.js";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// routes
app.use("/api/projects", ProjectsRoute);
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// error middleware (must be last)
app.use(errorMiddleware);

export default app;
