import { Request, Response } from "express";
import User from "../../models/User";
import { compareHashWithTextPassword, createHashPassword } from "../../utils/bcrypt";
import { sign } from "jsonwebtoken";
import Permission from "../../models/Permission";

const invalidCredentialsMessage = "Invalid credentials, please try again";

interface IUserCreateDTO {
    name: string,
    email: string,
    password: string,
    cpf: string
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })

        if (!user) {
            return res.status(403).send({
                message: invalidCredentialsMessage
            })
        }

        const isValidPassword = await compareHashWithTextPassword(password, user.password);

        if (!isValidPassword) {
            return res.status(403).send({
                message: invalidCredentialsMessage
            })
        }

        const keySecret = process.env.KEY_SECRET || "secret";

        const token = sign({
            id: user.id
        }, keySecret, {expiresIn: "24h"});

        return res.status(200).send({
            userId: user.id,
            token
        })
    } catch (error) {
        res.status(500).send({
            message: invalidCredentialsMessage
        })
    }
}

const signup = async (req: Request, res: Response) => {
    try {
        const userToCreate: IUserCreateDTO = req.body;

        userToCreate.password = await createHashPassword(userToCreate.password);

        const userPermission = await Permission.findFirst({ where: { role: 'user' } });

        if (!userPermission) {
            return res.status(400).send({ message: "User role not found" });
        }

        const userResponse = await User.create({
            data: {
                ...userToCreate,
                avatar: '',
                permission_id: userPermission.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        })

        res.status(200).send(userResponse)
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try create User"
        })
    }
}

export default {
    login,
    signup
}