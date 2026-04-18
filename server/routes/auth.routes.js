import express from "express";
import { googleAuth, logOut } from "../controllers/auth.controller.js";
const authRoter=express.Router();

authRoter.post("/google",googleAuth);
authRoter.get("/logout",logOut);

export default authRoter;