import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../models/responseModel";

const errorHandler = (
    err: Error | null,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (!err) {
        console.error("Error: null or undefined error received");
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
        );
        return;
    }

    console.error(`Error: ${err.message}`);
    
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
        errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
    );
};

export default errorHandler;