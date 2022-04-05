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
        if(admin) {
            const passwordMatches = bcrypt.compareSync(password, admin.password)
            if(passwordMatches){
                res.send({admin, token: createToken(admin.id)})
            }
            else{
                throw Error('Email or Password Invalid!')
            }
        }
        else{
            throw Error('Email or Password Invalid!')
        }
    }catch(err){
        //@ts-ignore
        res.status(400).send({error: err.message})
    }

})
app.post('/register', async(req,res) =>{
    const {fullName, email, password, avatar} = req.body

    try {
        const hash = bcrypt.hashSync(password)
        const admin = await prisma.admin.create({data: {fullName, email, password: hash, avatar, hospital: {connect: {name: 'Medica+'}} }})
        
        if(admin){
            res.send({admin, token: createToken(admin.id)})
        }
        else{
            throw Error('Email is already taken!')
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
async function getAdminFromToken(token: string) {
    //@ts-ignore
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await prisma.admin.findUnique({
      // @ts-ignore
      where: { id: data.id }
    });
  
    return admin;
  }
app.get("/validate", async (req, res) => {
    const token = req.headers.authorization;
  
    try {
      //@ts-ignore
      const admin = await getAdminFromToken(token);
      res.send(admin);
    } catch (err) {
      //@ts-ignore
      res.status(400).send({ error: err.message });
    }
  });
app.get('/doctors', async (req,res) => {
    try{
        const doctors = await prisma.doctor.findMany({include: {appointments: true, department: true}})
        res.send(doctors)
    }
    catch(err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.post('/doctors', async(req,res) => {
    const {email, fullName, phoneNumber, address, gender, avatar, employeedAt, salary, departmentId} = req.body


    try{
        const matched = await prisma.doctor.findUnique({where: {email}})
        if(matched){
            throw Error('Doctor with this email already exists!')
        }else{
            const doctor = await prisma.doctor.create({data: {
                email,
                fullName,
                phoneNumber,
                address,
                gender,
                avatar,
                employeedAt,
                salary,
                departmentId
            }, include: {department: true, appointments: true}})
            res.send(doctor)
        }
    }catch(err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.delete('/doctors/:id', async (req,res) =>{
    const id = Number(req.params.id)

    try{
        const doctor = await prisma.doctor.findUnique({where: {id}})
        if(doctor){
            await prisma.doctor.delete({where: {id}})
            res.send({message: 'Doctor succesfully deleted!'})
        }
    }
    catch(err){
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.get('/nurses', async (req,res) => {
    try{
        const nurses = await prisma.nurse.findMany({include: {department:true}})
        res.send(nurses)
    }
    catch(err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.get('/patients', async (req,res) => {
    try{
        const patients = await prisma.patient.findMany({include: {appointments: true}})
        res.send(patients)
    }
    catch(err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.get('/appointments', async (req,res) => {
    try{
        const appointments = await prisma.appointment.findMany({include : {patient: true, doctor: true}})
        res.send(appointments)
    }
    catch(err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.post('/appointments', async (req, res) => {
    const {patientId, doctorId} = req.body

    try {
        const appointment = await prisma.appointment.create({data: {patientId, doctorId},include: {doctor: true,patient: true}})
        
        res.send(appointment)
        
    } catch (err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.patch('/appointments/:id', async (req, res) => {

    const id = Number(req.params.id)

    const {status, treatment, payment } = req.body

    try {
        const updatedAppointment = await prisma.appointment.update({where: {id: id},data: {payment: payment, status: status, treatment: treatment}})
        
        res.send(updatedAppointment)
        
    } catch (err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.delete('/appointments/:id', async (req,res) => {
    const id = Number(req.params.id)
    try {
        const appointment = await prisma.appointment.findUnique({where: {id : id}})

        if(appointment){
            const appointment = await prisma.appointment.delete({where: {id: id}})
            res.send({msg: 'Appointmentent deleted succesfully'})
        }
        else{
            throw Error('Appointment with this Id doesnt exists!')
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.post('/appointmentWithNewPatient', async (req,res) => {
    const {fullName, email, phoneNumber, address, gender, avatar, doctorId} = req.body

    try{
        const patient = await prisma.patient.findUnique({where: {email}})
        if(patient){
            throw Error('Patient already exists!')
        }
        else{
            const patient =  await prisma.patient.create({data:{fullName, email, phoneNumber, address, gender, avatar}})

            const appointment = await prisma.appointment.create({data: {patientId: patient.id, doctorId}, include: {doctor: true, patient: true}})

            const patientWithAppointments = await prisma.patient.findUnique({where: {id: patient.id},include: {appointments: true}})
            res.send({appointment: appointment, patient: patientWithAppointments})
        }
    }
    catch(err){
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.get('/departments', async (req,res) => {
    try{
        const departments = await prisma.department.findMany({include: {doctors: true, nurses: true}})
        res.send(departments)
    }
    catch(err) {
        //@ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.listen(PORT, () =>{
    console.log(`Server up and running on http://localhost:${PORT}`)
})