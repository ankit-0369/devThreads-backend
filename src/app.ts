import express, { Application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app: Application= express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())



//routes import----

import userRoutes from './routes/user.routes'

app.use('/api/v1/users', userRoutes);


export default app;












/*
    express.json used to parse incoming json payloads from req.body. limit important
    for prevention of DDOS attack. It looks for content-type: application/json

    express.urlencoded used URL-encoded data (from forms) from the request body.
    It looks for content-tpye: application/x-www-form-urlencoded.

    express.static used to serve static files from public folder.
*/