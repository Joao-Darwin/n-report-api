import { Request, Response } from "express";
import { createHashPassword, compareHashWithTextPassword } from "../../utils/bcrypt";
import User from "../../models/User";
import Permission from "../../models/Permission";

interface IUserCreateDTO {
    name: string,
    email: string,
    password: string,
    cpf: string
}

const createAdminUser = async (req: Request, res: Response) => {
    try {
        const userToCreate: IUserCreateDTO = req.body;

        userToCreate.password = await createHashPassword(userToCreate.password);

        const userPermission = await Permission.findFirst({ where: { role: 'admin' } });

        if (!userPermission) {
            return res.status(400).send({ message: "User role not found" });
        }

        const avatar = req.file ? req.file.filename : '';

        const userResponse = await User.create({
            data: {
                ...userToCreate,
                avatar: avatar,
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
            if (user) {
                const avatarUrl = user.avatar
                    ? `${req.protocol}://${req.get('host')}/images/${user.avatar}`
                    : null;

                return res.status(200).send({
                    ...user,
                    avatar: avatarUrl
                });
            }
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

const profile = async (req: Request, res: Response) => {
    try {
        const id = req.userId

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
            const avatarUrl = user.avatar
                ? `${req.protocol}://${req.get('host')}/images/${user.avatar}`
                : null;

            return res.status(200).send({
                ...user,
                avatar: avatarUrl
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

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const userToCreate: IUserCreateDTO = req.body;

        const avatar = req.file ? req.file.filename : '';

        const user = await updateUser(id, userToCreate, avatar);

        if (user) {
            if (user) {
                const avatarUrl = user.avatar
                    ? `${req.protocol}://${req.get('host')}/images/${user.avatar}`
                    : null;

                return res.status(200).send({
                    ...user,
                    avatar: avatarUrl
                });
            }
        }

        res.status(404).send({
            message: "User not found"
        })
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try update user"
        })
    }
}

const updateUser = async (userId: string, userToCreate: IUserCreateDTO, avatar: string) => {
    userToCreate.password = await createHashPassword(userToCreate.password);

    return await User.update({
        where: { id: userId },
        data: {
            ...userToCreate,
            avatar: avatar
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
}

const updateSelf = async (req: Request, res: Response) => {
    try {
        const id = req.userId;

        const userToCreate: IUserCreateDTO = req.body;

        const avatar = req.file ? req.file.filename : '';

        const user = await updateUser(id as string, userToCreate, avatar);

        if (user) {
            if (user) {
                const avatarUrl = user.avatar
                    ? `${req.protocol}://${req.get('host')}/images/${user.avatar}`
                    : null;

                return res.status(200).send({
                    ...user,
                    avatar: avatarUrl
                });
            }
        }

        res.status(404).send({
            message: "User not found"
        });
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try update user"
        });
    }
}

const updatePassword = async (req: Request, res: Response) => {
    try {
        const id = req.userId;

        const user = await User.findFirst({
            where: {
                id,
            }, select: {
                password: true
            }
        });

        const passwords = req.body;

        const hashPass = await compareHashWithTextPassword(passwords.actualPass, user?.password as string);        // console.log(passwords.actualPass);

        if (!hashPass) {
            return res.status(400).send("Senhas diferentes!");
        }

        const senhaNova = await createHashPassword(passwords.newPass);

        const newUser = await User.update({
            where: {
                id,
            },
            data: {
                password: senhaNova
            },
            select: {
                id: true,
                password: true,
            }
        });

        return res.status(200).send("Senha atualizada com sucesso!");

    } catch (error: any) {
        res.status(500).send({
            message: "Error on try update password: ",
            error
        })
    }
}

const updateEmail = async (req: Request, res: Response) => {
    try {
        const id = req.userId;
        const { email } = req.body;

        console.log(email)

        const user = await User.update({
            where: {
                id: id
            },
            data: {
                email: email
            }
        });

        return res.status(200).send("Email updated with success!");
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try update email"
        })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const user = await User.delete({ where: { id: id } })

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
            message: "Error on try delete user"
        })
    }
}

const removeSelf = async (req: Request, res: Response) => {
    try {
        const id = req.userId;

        const user = await User.delete({ where: { id: id } })

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
            message: "Error on try delete user"
        })
    }
}

export default {
    createAdminUser,
    findAll,
    findById,
    profile,
    update,
    updateSelf,
    updatePassword,
    updateEmail,
    remove,
    removeSelf,
}