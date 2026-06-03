// app.js
import express from "express";
import cors from "cors";
import ProjectsRoute from "./routes/projects.route.js";
import authRoute from "./routes/auth.route.js";
import tasksRoute from "./routes/tasks.route.js";
import commentRoute from "./routes/comment.route.js";
import membersRoute from "./routes/members.route.js";
import historyRoute from "./routes/history.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();

// middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
// routes
app.use("/api/projects", ProjectsRoute);
app.use("/api/auth", authRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/comments", commentRoute);
app.use("/api/members", membersRoute);
app.use("/api/history", historyRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// error middleware (must be last)
app.use(errorMiddleware);

export default app;
