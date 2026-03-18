import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { ServiceError } from "../errors/errors";

export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { uid, claims } = req.body as {
        uid?: string;
        claims?: Record<string, unknown>;
    };

    try {
        if (!uid || !claims) {
            throw new ServiceError(
                "uid and claims are required",
                "VALIDATION_ERROR",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        await auth.setCustomUserClaims(uid, claims);

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                {},
                `Custom claims set for user: ${uid}. User must obtain a new token for changes to take effect.`
            )
        );
    } catch (error) {
        next(error);
    }
};