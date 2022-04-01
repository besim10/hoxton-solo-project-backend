import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
 function createToken(id: number){
    //@ts-ignore
    const token = jwt.sign({id: id}, process.env.SECRET_KEY, {
        expiresIn: '3days'
    })
    return token
}
app.post('/login', async (req,res) => {
    const {email, password} = req.body

    try{
        const admin = await prisma.admin.findUnique({where: {email: email}})
        //@ts-ignore
        const passwordMatches = bcrypt.compareSync(password, admin.password)

        if(admin && passwordMatches){
            res.send({admin, token: createToken(admin.id)})
        }
        else{
            throw Error('Email or Password Invalid!')
        }
    }catch(err){
        //@ts-ignore
        res.status(400).send({error: err.message})
    }

})
app.listen(PORT, () =>{
    console.log(`Server up and running on http://localhost:${PORT}`)
})