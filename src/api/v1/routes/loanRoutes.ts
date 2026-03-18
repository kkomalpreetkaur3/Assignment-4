import express from "express";
import {
    getLoansHandler,
    getLoanByIdHandler,
    createLoanHandler,
    updateLoanHandler,
    deleteLoanHandler,
} from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

router.get("/", authenticate, getLoansHandler);
router.get("/:id", authenticate, getLoanByIdHandler);

router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["manager", "admin"] }),
    createLoanHandler
);

router.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["manager", "admin"] }),
    updateLoanHandler
);

router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    deleteLoanHandler
);

export default router;