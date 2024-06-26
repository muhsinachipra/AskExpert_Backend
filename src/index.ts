// backend\src\index.ts

import { app } from "./infrastructureLayer/config/app";
import connectDB from "./infrastructureLayer/config/db";
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const start = () => {
    app.get('/', (req, res) => {
        res.send('Welcome Home!')
    })

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost/${PORT}`)
        connectDB()
    })
}

start()