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

