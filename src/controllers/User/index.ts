import { Request, Response } from "express";
import { createHashPassword } from "../../utils/bcrypt";
import User from "../../models/User";
import Permission from "../../models/Permission";

interface IUserCreateDTO {
    name: string,
    email: string,
    password: string,
    cpf: string
}

const create = async (req: Request, res: Response) => {
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

const createAdminUser = async (req: Request, res: Response) => {
    try {
        const userToCreate: IUserCreateDTO = req.body;

        userToCreate.password = await createHashPassword(userToCreate.password);

        const userPermission = await Permission.findFirst({ where: { role: 'admin' } });

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

const findAll = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        res.status(200).send(allUsers);
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try find user"
        })
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const user = await User.findFirst({
            where: { id: id },
            select: {
                id: true,
                avatar: true,
                name: true,
                email: true,
                cpf: true,
                created_at: true,
                updated_at: true,
                Permission: {
                    select: {
                        role: true
                    }
                }
            }
        });

        if (user) {
            return res.status(200).send(user);
        }

        res.status(404).send({
            message: "User not found"
        })
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try find user"
        })
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const userToCreate: IUserCreateDTO = req.body;
        userToCreate.password = await createHashPassword(userToCreate.password);

        const user = await User.update({
            where: { id: id },
            data: {
                ...userToCreate,
                avatar: ''
            },
            select: {
                id: true,
                avatar: true,
                name: true,
                email: true,
                cpf: true,
                created_at: true,
                updated_at: true,
                Permission: {
                    select: {
                        role: true
                    }
                }
            }
        });

        if (user) {
            return res.status(200).send(user);
        }

        res.status(404).send({
            message: "User not found"
        })
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try find user"
        })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const user = await User.delete({where: {id: id}})

        if (user) {
            return res.status(200).send({
                message: "User deleted"
            });
        }

        res.status(404).send({
            message: "User not found"
        })
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try find user"
        })
    }
}

export default {
    create,
    createAdminUser,
    findAll,
    findById,
    update,
    remove
}