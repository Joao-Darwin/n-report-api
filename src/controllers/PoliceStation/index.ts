import { Request, Response } from "express";
import PoliceStation from "../../models/PoliceStation";

interface IPoliceStationCreateDTO {
    name: string,
    email: string,
    phone: string,
    latitude: number,
    longitude: number
}

const createPoliceStation = async (req: Request, res: Response) => {
    try {
        const policeStationToCreate: IPoliceStationCreateDTO = req.body;

        const policeStationResponse = await PoliceStation.create({
            data: {
                ...policeStationToCreate
            }, 
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
            }
        })

        res.status(200).send(policeStationResponse);
    } catch(error: any) {
        res.status(500).send({
            message: "Error on try create a Police Station",
            error,
        })
    }
}

const findAll = async (req: Request, res: Response) => {
    try {
        const allPoliceStations = await PoliceStation.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        res.status(200).send(allPoliceStations);
    } catch(error: any) {
        res.status(500).send({
            message: "Error on try find all Police Station",
            error,
        })
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const policeStationResponse = await PoliceStation.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
            }
        });

        if(!policeStationResponse){
            return res.status(404).send("PoliceStation not found")
        }

        res.status(200).send(policeStationResponse);
    } catch(error: any) {
        res.status(500).send({
            message: "Error on find a Police Station by ID",
            error,
        })
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const policeStationToCreate: IPoliceStationCreateDTO = req.body;

        const policeStationResponse = await PoliceStation.update({
            where: {
                id: id,
            }, 
            data: {
                ...policeStationToCreate,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
            }
        });

        if(!policeStationResponse){
            return res.status(404).send({
                message: "PoliceStation not found"
            })
        }

        res.status(200).send(policeStationResponse);
    } catch(error: any) {
        res.status(500).send({
            message: "Error on update a Police Station",
            error,
        })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;

        const policeStation = await PoliceStation.delete({
            where:{
                id: id,
            }
        })

        if(!policeStation){
            return res.status(500).send("Police Station not found")
        }

        res.status(200).send({
            message: "Police Station deleted"
        })
    } catch(error: any) {
        res.status(500).send({
            message: "Error on delete a Police Station",
            error,
        })
    }
}

export default {
    createPoliceStation,
    findAll,
    findById,
    update,
    remove,
}