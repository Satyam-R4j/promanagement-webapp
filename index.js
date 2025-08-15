import dotenv from 'dotenv'
dotenv.config({
    path: "./.env"
})

import express from 'express'

const app = express()
const port = process.env.PORT || 3000


app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`App listening on port http://localhost:${port}`)
})