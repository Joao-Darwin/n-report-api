import { Request, Response } from "express";
import Image from "../../models/Image";

const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const image = await Image.delete({
            where: {
                id: id,
            }
        })

        if (!image) {
            return res.status(400).send({ message: "Image not found!" });
        }

        res.status(200).send({ message: "Image deleted with success!" });
    } catch (error: any) {
        console.log(error);
        res.status(500).send({ message: "Error on try delete image!" })
    }
}

export default {
    remove
}