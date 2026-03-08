import { Request, Response, NextFunction } from "express";
import { loans, LoanApplication } from "../models/loanModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { NotFoundError, ServiceError } from "../errors/errors";

export const getLoansHandler = (
    _req: Request,
    res: Response
): void => {
    res.status(HTTP_STATUS.OK).json({
        message: "Loan applications retrieved",
        count: loans.length,
        data: loans,
    });
};

export const getLoanByIdHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw new ServiceError(
                "Invalid loan application id",
                "INVALID_ID",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const loan = loans.find((item) => item.id === id);

        if (!loan) {
            throw new NotFoundError(
                "Loan application not found",
                "LOAN_NOT_FOUND"
            );
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Loan application retrieved",
            data: loan,
        });
    } catch (error) {
        next(error);
    }
};

export const createLoanHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const { applicant, amount } = req.body as {
            applicant?: string;
            amount?: number;
        };

        if (!applicant || typeof amount !== "number") {
            throw new ServiceError(
                "Applicant and amount are required",
                "VALIDATION_ERROR",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const newLoan: LoanApplication = {
            id: loans.length ? Math.max(...loans.map((loan) => loan.id)) + 1 : 1,
            applicant,
            amount,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        loans.push(newLoan);

        res.status(HTTP_STATUS.CREATED).json({
            message: "Loan application created",
            data: newLoan,
        });
    } catch (error) {
        next(error);
    }
};

export const updateLoanHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body as { status?: "pending" | "under_review" | "flagged" };

        if (Number.isNaN(id)) {
            throw new ServiceError(
                "Invalid loan application id",
                "INVALID_ID",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const loan = loans.find((item) => item.id === id);

        if (!loan) {
            throw new NotFoundError(
                "Loan application not found",
                "LOAN_NOT_FOUND"
            );
        }

        if (!status) {
            throw new ServiceError(
                "Status is required",
                "VALIDATION_ERROR",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        loan.status = status;

        res.status(HTTP_STATUS.OK).json({
            message: "Loan application updated",
            data: loan,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteLoanHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw new ServiceError(
                "Invalid loan application id",
                "INVALID_ID",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const index = loans.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new NotFoundError(
                "Loan application not found",
                "LOAN_NOT_FOUND"
            );
        }

        const deletedLoan = loans[index];
        loans.splice(index, 1);

        res.status(HTTP_STATUS.OK).json({
            message: "Loan application deleted",
            data: deletedLoan,
        });
    } catch (error) {
        next(error);
    }
};