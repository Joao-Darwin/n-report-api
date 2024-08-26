import express, { Request, Response } from "express"
import cors from "cors"
import userRouter from "../routers/User"
import authRouter from "../routers/Authentication";
import permissionRouters from "../routers/Permission";
import ocurrenceRouter from "../routers/Ocurrence";
import policeStationRouter from "../routers/PoliceStation";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());

const basePathUrlApiV1 = "/api/v1";

app.get(`${basePathUrlApiV1}/hello-world`, (req: Request, res: Response) => res.status(200).send({message: 'Hello World'}));

app.use("/auth", authRouter);
app.use(`${basePathUrlApiV1}/users`, userRouter);
app.use(`${basePathUrlApiV1}/permissions`, permissionRouters);
app.use(`${basePathUrlApiV1}/ocurrences`, ocurrenceRouter);
app.use(`${basePathUrlApiV1}/policeStation`, policeStationRouter);
app.use("/images", express.static(path.join(__dirname, "..", "..", "uploads")));

export default app;