import express from "express";
import { healthCheckHandler } from "../controllers/healthController";

const router = express.Router();

router.get("/", healthCheckHandler);

export default router;