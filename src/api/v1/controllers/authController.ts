import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { ServiceError } from "../errors/errors";

export const signInHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body as {
            email?: string;
            password?: string;
        };

        if (!email || !password) {
            throw new ServiceError(
                "Email and password are required",
                "VALIDATION_ERROR",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const apiKey = "FIREBASE_WEB_API_KEY" in process.env ? process.env.FIREBASE_WEB_API_KEY : undefined;

        if (!apiKey) {
            throw new ServiceError(
                "Firebase Web API key is missing",
                "CONFIG_ERROR",
                HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        const firebaseResponse = await axios.post(url, {
            email,
            password,
            returnSecureToken: true,
        });

        const { idToken, email: userEmail, localId, expiresIn, refreshToken } =
            firebaseResponse.data as {
                idToken: string;
                email: string;
                localId: string;
                expiresIn: string;
                refreshToken: string;
            };

        res.status(HTTP_STATUS.OK).json({
            idToken,
            email: userEmail,
            localId,
            expiresIn,
            refreshToken,
        });
    } catch (error) {
        next(error);
    }
};