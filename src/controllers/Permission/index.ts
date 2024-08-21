import { Request, Response } from "express";
import Permission from "../../models/Permission";

interface IPermissionCreateDTO {
    role: string
}

const create = async (req: Request, res: Response) => {
    try {
        const permission: IPermissionCreateDTO = req.body;

        const permissionCreated = await Permission.create({
            data: permission,
            select: {
                id: true,
                role: true
            }
        });

        res.status(200).send(permissionCreated);
    } catch (error) {
        res.status(500).send({
            message: "Error on try create permission"
        });
    }
}

const findAll = async (req: Request, res: Response) => {
    try {
        const allPermissions = await Permission.findMany({
            select: {
                id: true,
                role: true
            }
        })

        res.status(200).send(allPermissions);
    } catch (error) {
        res.status(500).send({
            message: "Error on try create permission"
        });
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const permissionId = req.params.id;

        const permission = await Permission.findUnique({
            where: {
                id: permissionId
            }
        })

        if (!permission) {
            return res.status(404).send({
                message: "Permission not found"
            })
        }

        res.status(200).send(permission);
    } catch (error) {
        res.status(500).send({
            message: "Error on try create permission"
        });
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const permissionId = req.params.id;
        const permission: IPermissionCreateDTO = req.body;

        const permissionUpdated = await Permission.update({
            where: {
                id: permissionId
            },
            data: {
                ...permission
            },
            select: {
                id: true,
                role: true
            }
        })

        if (!permissionUpdated) {
            return res.status(404).send({
                message: "Permission not found"
            })
        }

        res.status(200).send(permissionUpdated);
    } catch (error) {
        res.status(500).send({
            message: "Error on try create permission"
        });
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const permissionId = req.params.id;

        const permission = await Permission.delete({
            where: {
                id: permissionId
            }
        })

        if (!permission) {
            return res.status(404).send({
                message: "Permission not found"
            })
        }

        res.status(200).send({
            message: "Permission deleted"
        });
    } catch (error) {
        res.status(500).send({
            message: "Error on try create permission"
        });
    }
}

export default {
    create,
    findAll,
    findById,
    update,
    remove
}