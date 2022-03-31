import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 8000;

app.get('/hospital', async(req,res) =>{
    const hospital = await prisma.hospital.findUnique({where: {name: 'Medica+'}})
    res.send(hospital)
})

app.listen(PORT, () =>{
    console.log(`Server up and running on http://localhost:${PORT}`)
})