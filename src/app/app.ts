import express, { Request, Response } from "express"
import cors from "cors"
import userRouter from "../routers/User"
import authRouter from "../routers/Authentication";

const app = express();

app.use(express.json());
app.use(cors());

const basePathUrlApiV1 = "/api/v1";

app.get(`${basePathUrlApiV1}/hello-world`, (req: Request, res: Response) => res.status(200).send({message: 'Hello World'}));

app.use("/auth", authRouter);
app.use(`${basePathUrlApiV1}/users`, userRouter);

export default app;