import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import {connectDB} from "../src/db/indexDB.js";


const port = process.env.PORT || 3001;


connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    })
})
.catch((error) => {
    console.log(`DataBase connection error: ${error}`);
})