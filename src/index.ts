
import 'dotenv/config'
import express, { Application } from "express";

        
const app: Application= express()


app.get('/', (req, res)=>{
    res.send("Welcome to the new project");
})

const PORT= process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server started at", PORT);
})