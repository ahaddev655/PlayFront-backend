import express from "express";
import upload from "../middleware/uploads.js";
import { signUp } from "./../controllers/auth_controllers.js";

const routes = express.Router();

routes.post("/signup", upload.single("profileImage"), signUp);

export default routes;
