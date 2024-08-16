import { config } from "dotenv";
import app from "./app/app";

config();

const portApplication: string | undefined = process.env.PORT;

app.listen(portApplication, () => {
    console.log(`Application running on the port ${portApplication}`);
})