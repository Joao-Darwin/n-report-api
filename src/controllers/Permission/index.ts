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
        res.status(501).send({
            message: "Error on try create permission"
        });
    }
}

export default {
    create
}