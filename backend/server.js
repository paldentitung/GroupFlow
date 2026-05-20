import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import ProjectsRoute from "./routes/projects.route.js";
dotenv.config({
  path: "./.env.development",
});

const app = express();
app.use(express.json());
app.use(cors());
// database connection
connectDB();

const PORT = process.env.PORT || 5000;

// routes
app.use("/api/projects", ProjectsRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
