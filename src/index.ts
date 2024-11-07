// backend\src\index.ts

import connectDB from "./infrastructureLayer/config/db";
import { httpServer } from './infrastructureLayer/config/app'
require('dotenv').config()

const PORT = process.env.PORT || 10000;

console.log("App is listening on port", PORT);

const start = () => {

    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost/${PORT}`)
        connectDB()
    })
}

start()