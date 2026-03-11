import express from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import healthRoutes from "./api/v1/routes/healthRoutes";
import authRoutes from "./api/v1/routes/authRoutes";
import loanRoutes from "./api/v1/routes/loanRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

const app = express();

app.use(accessLogger);
app.use(errorLogger);
app.use(consoleLogger);

app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);

export default app;