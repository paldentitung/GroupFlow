import express from "express";
import { registerController } from "../controllers/auth.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const Router = express.Router();

Router.post("/register", asyncHandler(registerController));

export default Router;
