import { config } from "dotenv";
import app from "./app/app";
import cors from "cors";

app.use(
    cors({
        origin: "http://localhost:3000", 
        credentials: true,
    })
);

config();

const portApplication: string | undefined = process.env.PORT;

app.listen(portApplication, () => {
    console.log(`Application running on the port ${portApplication}`);
})