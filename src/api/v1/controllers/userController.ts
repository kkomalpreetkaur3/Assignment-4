import { Request, Response, NextFunction } from "express";
import { UserRecord } from "firebase-admin/auth";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id } = req.params;

    try {
        const user: UserRecord = await auth.getUser(id);
        res.status(HTTP_STATUS.OK).json(successResponse(user));
    } catch (error) {
        next(error);
    }
};