import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
    id: string,
    iat: number,
    exp: number;
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({
                "message": "Token not provided"
            })
        }

        const [, token] = authorization.split(" ");

        try {
            const keySecret = process.env.KEY_SECRET || "secret";

            const decoded = verify(token, keySecret);

            const { id } = decoded as TokenPayload

            req.userId = id;
            next();
        } catch (error) {
            return res.status(401).send({
                "message": "Token invalid"
            })
        }
    } catch (error: any) {
        return res.status(500).send({
            "message": "Token invalid"
        })
    }
}