require("dotenv").config();
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import userRouter from "../route/userRoutes"
import adminRouter from "../route/adminRoutes"
import expertRouter from "../route/expertRoutes"
import errorHandler from "../../usecaseLayer/handler/errorHandler";

export const app = express()

app.use(cors({ credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(morgan("dev"))

app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/expert', expertRouter)
app.use(errorHandler)
