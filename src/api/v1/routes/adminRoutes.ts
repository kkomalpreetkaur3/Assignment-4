import express from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.post("/setCustomClaims", authenticate, setCustomClaims);

export default router;