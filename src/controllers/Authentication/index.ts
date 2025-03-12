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

interface UserUpdateEmail {
    id: string,
    email: string
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
            message: "Error on try create User",
            error
        })
        console.error("Error on try create User: ", error);
    }
}

const changePassword = async (req: Request, res: Response) => {
    try {
        if(!req.userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const response = req.body;

        const { currentPassword, newPassword } = response;
        
        const user = await User.findUnique({
            where: {
                id: req.userId
            },
            select: {
                id: true,
                password: true
            }
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const isValidPassword = await compareHashWithTextPassword(currentPassword, user.password);

        if (!isValidPassword) {
            res.status(400).json({ error: "Invalid old password" });
            return;
        }

        const newPasswordHash = await createHashPassword(newPassword);

        const updatedUser = await User.update({
            where: {
                id: user.id
            },
            data: {
                password: newPasswordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        res.status(200).json(updatedUser);
    } catch (error: any) {
       res.status(500).send({
           message: "Error on try change password",
           error,
       });

       console.error("Error on try change password: ", error);
    }
}

const changeEmail = async (req: Request, res: Response) => {
    try {
        if(!req.userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const response = req.body;

        const { email, newEmail } = response;
        
        const user = await User.findUnique({
            where: {
                id: req.userId
            },
            select: {
                id: true,
                email: true,
            }
        });

        if ((user?.email ?? "") !== email) {
            res.status(400).json({ error: "Invalid email" });
            return;
        }

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const updatedUser = await User.update({
            where: {
                id: user.id
            },
            data: {
                email: newEmail,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        res.status(200).json(updatedUser);
    } catch (error: any) {
       res.status(500).send({
           message: "Error on try change password",
           error,
       });

       console.error("Error on try change password: ", error);
    }
}

const currentUser = async (req: Request, res: Response) => {
    try {

        if(!req.userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const user = await User.findUnique({
            where: {
                id: req.userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                //se precisar pegar a foto de perfil, vai aqui também!!
            }
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        
        return res.status(200).json(user);

    } catch (error: any) {

        res.status(500).send({
            message: "Internal Server Error",
            error
        })

        console.error("Error on try create User: ", error);

    }
}

export default {
    login,
    signup,
    changePassword,
    changeEmail,
    currentUser
}