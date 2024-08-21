import { Request, Response } from "express";
import Ocurrence from "../../models/Ocurrence";
import User from "../../models/User";
import PoliceStation from "../../models/PoliceStation";

interface IOcurrenceCreateDTO {
    description?: string,
    type: string,
    latitude: number,
    longitude: number,
    resolved: boolean,
    policeStation: string
}

const createOcurrence = async (req: Request, res: Response) => {
    try {
        const ocurrenceToCreate: IOcurrenceCreateDTO = req.body;

        const userExist = await User.findUnique({
            where: {
                id: req.userId
            }
        })

        if (!userExist){
            return res.status(404).send({message: "User not found!"});
        }

        const policeStation = await PoliceStation.findUnique({
            where: {
                id: ocurrenceToCreate.policeStation
            }
        })

        if (!policeStation){
            return res.status(404).send({message: "Police Station not found!"});
        }

        const ocurrenceResponse = await Ocurrence.create({
            data: {
                ...ocurrenceToCreate,
                user_id: userExist.id,
                policeStation_id: policeStation.id
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

        res.status(200).send(ocurrenceResponse);
    } catch (error: any) {
        res.status(500).send({
            message: "Error on try create Ocurrence"
        })
    }
} 

const findAll = async (req: Request, res: Response) => {
    const user = req.userId;
    
    try {
        const allOcurrences = await Ocurrence.findMany({
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
            }, where: {
                user_id: user,
            }
        })

        res.status(200).send(allOcurrences);
    } catch(error: any) {
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
        });

        if (!ocurrence){
            return res.status(404).send({message: "Ocurrence not found!"});
        }

        res.status(200).send(ocurrence);
    } catch (error: any) {
        res.status(500).send({message: "Error on try find an ocurrence"});
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;
        const user = req.userId;

        const ocurrenceToCreate: IOcurrenceCreateDTO = req.body;

        const ocurrence = await Ocurrence.update({
            where: {
                id: id,
                user_id: user,
            },
            data: {
                ...ocurrenceToCreate,      
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

        if(!ocurrence) {
            return res.status(404).send({message: "Ocurrence not found!"}) 
        }

        res.status(200).send(ocurrence);
    } catch(error: any) {
        res.status(500).send({message: "Error on try update ocurrence"})
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const user = req.userId;



        const ocurrence = await Ocurrence.delete({
            where: {
                id,
                user_id: user,
            }
        })

        if(!ocurrence){
            return res.status(404).send("Ocurrence not found!")
        }

        return res.status(200).send({message: "Ocurrence deleted"})
    } catch(error: any) {
        res.status(500).send({message: "Error on try delete ocurrence!"})
    }
}

export default {
    createOcurrence,
    findAll,
    findById,
    update,
    remove, 
}