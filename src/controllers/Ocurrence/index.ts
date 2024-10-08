import { Request, Response } from "express";
import Ocurrence from "../../models/Ocurrence";
import PoliceStation from "../../models/PoliceStation";
import User from "../../models/User";

interface IOcurrenceCreateDTO {
    title: string,
    description?: string,
    type: string,
    latitude: number,
    longitude: number,
    date: string,
    time: string,
    policeStation_id: string,
}

const createOcurrence = async (req: Request, res: Response) => {
    try {
        const ocurrenceToCreate: IOcurrenceCreateDTO = req.body;

        ocurrenceToCreate.latitude = Number(ocurrenceToCreate.latitude);
        ocurrenceToCreate.longitude = Number(ocurrenceToCreate.longitude);

        const reqImagens = req.files as Express.Multer.File[];

        const images = reqImagens.map((img) => {
            return {
                path: img.filename,
            }
        })

        const userExist = await User.findUnique({
            where: {
                id: req.userId
            }
        })

        if (!userExist) {
            return res.status(404).send({ message: "User not found!" });
        }

        const policeStation = await PoliceStation.findUnique({
            where: {
                id: ocurrenceToCreate.policeStation_id
            }
        })

        if (!policeStation) {
            return res.status(404).send({ message: "Police Station not found!" });
        }

        const ocurrenceResponse = await Ocurrence.create({
            data: {
                ...ocurrenceToCreate,
                user_id: userExist.id,
                Images: {
                    create: images
                }
            },
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
                latitude: true,
                longitude: true,
                date: true,
                time: true,
                resolved: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    }
                },
                PoliceStation: {
                    select: {
                        name: true,
                        phone: true,
                    }
                }
            }
        })

        res.status(200).send(ocurrenceResponse);
    } catch (error) {
        console.error("Detailed Error:", error);
        res.status(500).send({
            message: "Error on try create Ocurrence",
            error: error
        });
    }
}

const findAll = async (req: Request, res: Response) => {

    try {
        const allOcurrences = await Ocurrence.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
                latitude: true,
                longitude: true,
                date: true,
                time: true,
                resolved: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    }
                },
                PoliceStation: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                    }
                },
                Images: {
                    select: {
                        id: true,
                        path: true
                    }
                }
            }
        });

        const allOcurrencesWithImages = allOcurrences.map((ocurrence) => {
            const images = ocurrence.Images.map((value) => {
                return {
                    id: value.id,
                    path: `${req.protocol}://${req.get('host')}/images/${value.path}`
                }
            })

            return {
                ...ocurrence,
                Images: images
            }
        })

        res.status(200).send(allOcurrencesWithImages);
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try find all ocurrences"
        })
    }
}

const findAllSelf = async (req: Request, res: Response) => {
    const user = req.userId;

    try {
        const allOcurrences = await Ocurrence.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
                latitude: true,
                longitude: true,
                date: true,
                time: true,
                resolved: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    }
                },
                PoliceStation: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                    }
                },
                Images: {
                    select: {
                        id: true,
                        path: true
                    }
                }
            },
            where: {
                user_id: user
            }
        });

        const allOcurrencesWithImages = allOcurrences.map((ocurrence) => {
            const images = ocurrence.Images.map((value) => {
                return {
                    id: value.id,
                    path: `${req.protocol}://${req.get('host')}/images/${value.path}`
                }
            })

            return {
                ...ocurrence,
                Images: images
            }
        })

        res.status(200).send(allOcurrencesWithImages);
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try find all ocurrences"
        })
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;
        const user = req.userId;

        const ocurrence = await Ocurrence.findFirst({
            where: {
                id,
                user_id: user,
            },
            select: {
                id: true,
                description: true,
                type: true,
                latitude: true,
                longitude: true,
                resolved: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    }
                },
                PoliceStation: {
                    select: {
                        name: true,
                        phone: true,
                    }
                },
                Images: {
                    select: {
                        id: true,
                        path: true
                    }
                }
            }
        });

        if (ocurrence) {
            const images = ocurrence.Images.map((value) => {
                return {
                    path: `${req.protocol}://${req.get('host')}/images/${value.path}`
                }
            })

            return res.status(200).send({
                ...ocurrence,
                Images: images
            });
        }

        if (!ocurrence) {
            return res.status(404).send({ message: "Ocurrence not found!" });
        }

        res.status(200).send(ocurrence);
    } catch (error: any) {
        res.status(500).send({ message: "Error on try find an ocurrence" });
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;
        const idUser = req.userId;

        const user = await User.findFirst({
            select: {
                Permission: {
                    select: {
                        role: true
                    }
                }
            },
            where: {
                id: idUser
            }
        });

        const ocurrenceToUpdate: IOcurrenceCreateDTO = req.body;

        ocurrenceToUpdate.latitude = Number(ocurrenceToUpdate.latitude);
        ocurrenceToUpdate.longitude = Number(ocurrenceToUpdate.longitude);

        const reqImagens = req.files as Express.Multer.File[];


        const images = reqImagens.map((img) => {
            return {
                path: img.filename,
            }
        })

        let whereFromUpdate;

        if (user?.Permission.role === 'admin') {
            whereFromUpdate = {
                id: id
            }
        } else {
            whereFromUpdate = {
                id: id,
                user_id: idUser,
            }

        }

        const ocurrence = await Ocurrence.update({
            where: whereFromUpdate,
            data: {
                ...ocurrenceToUpdate,
                Images: {
                    create: images,
                }
            },
            select: {
                id: true,
                description: true,
                type: true,
                latitude: true,
                longitude: true,
                resolved: true,
                User: {
                    select: {
                        name: true,
                        avatar: true,
                    }
                },
                PoliceStation: {
                    select: {
                        name: true,
                        phone: true,
                    }
                }
            }
        })

        if (!ocurrence) {
            return res.status(404).send({ message: "Ocurrence not found!" })
        }

        res.status(200).send(ocurrence);
    } catch (error: any) {
        console.log(error)
        res.status(500).send({ message: "Error on try update ocurrence" })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const user = await User.findFirst({
            select: {
                Permission: {
                    select: {
                        role: true
                    }
                }
            },
            where: {
                id: req.userId
            }
        });

        let ocurrence;

        if (user?.Permission.role === 'admin') {
            ocurrence = await Ocurrence.delete({
                where: {
                    id,
                }
            })
        } else {
            ocurrence = await Ocurrence.delete({
                where: {
                    id,
                    user_id: req.userId,
                }
            })
        }

        if (!ocurrence) {
            return res.status(404).send("Ocurrence not found!")
        }

        return res.status(200).send({ message: "Ocurrence deleted" })
    } catch (error: any) {
        res.status(500).send({ message: "Error on try delete ocurrence!" })
    }
}

export default {
    createOcurrence,
    findAll,
    findAllSelf,
    findById,
    update,
    remove,
}