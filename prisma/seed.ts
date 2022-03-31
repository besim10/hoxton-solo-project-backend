import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()


const hospital: Prisma.HospitalCreateInput = {
    address: 'Rruga e Dibrës 372 Tirana AL',
    email: 'info@medicaplus.com',
    name: 'Medica+',
    phoneNumber: '+355 4 234 9209',
    departments: {create: [
        {name: 'Dentists', rooms: 6, },
        {name: 'Neurology', rooms: 4},
        {name: 'Opthalmology', rooms: 10},
        {name: 'Orthopedics', rooms: 15},
        {name: 'Cancer Department', rooms: 7},
        {name: 'ENT Department', rooms: 4},
    ]},
}
const admins: Prisma.AdminCreateInput[] = [
    {
        avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQFfhgIPNISYvw/profile-displayphoto-shrink_200_200/0/1576272238469?e=1653523200&v=beta&t=bXpmqZhsm6T3H_7ka-crH3P6MSjjJqO79jHAFtsRKuE',
        email : 'besim@gmail.com',
        password: bcrypt.hashSync('besim123'),
        fullName: 'Besim Sokoli',
        hospital: {connect: {name: 'Medica+' }}
    },
    {
        avatar: 'https://miro.medium.com/max/2400/1*GET26Y6wcljxmybUcxe0yw.jpeg',
        email : 'nicolas@gmail.com',
        password: bcrypt.hashSync('nicolas123'),
        fullName: 'Nicolas Marcora',
        hospital: {connect: {name: 'Medica+' }}
    },
    {
        avatar: 'https://media-exp1.licdn.com/dms/image/C4D03AQEpcAcgGSoS_Q/profile-displayphoto-shrink_200_200/0/1633355002274?e=1652313600&v=beta&t=mkBpP4Z4KUwtxMHJOxZU0_-uYXfGk-uAyCJsTVBEo8o',
        email : 'ed@gmail.com',
        password: bcrypt.hashSync('ed123'),
        fullName: 'Ed Putans',
        hospital: {connect: {name: 'Medica+' }}
    }
]
const doctors: Prisma.DoctorCreateInput[] = [
    {
        address: "Rruga Ferit Xhajko, Nd. 14, H. 1",
        avatar: "https://www.volumecoder.com/templates/medical/img/team/single-doctor.jpg",
        fullName:'Jurgen Hasmeta',
        email: 'jurgen@gmail.com',
        employeedAt: '12/05/2004',
        gender: 'male',
        phoneNumber: '+3552542542',
        salary: 2.142,
        department: {connect: {name: 'Dentists'}}
    },
    {
        address: "Sheshi Skenderbej, Bulevardi Zogu I",
        avatar: "https://lakeforestgroup.com/wp-content/uploads/2014/11/doctor-profile-04.jpg",
        fullName:'Artiola Caka',
        email: 'artiola@gmail.com',
        employeedAt: '05/10/2008',
        gender: 'female',
        phoneNumber: '+3551425625',
        salary: 3.600,
        department: {connect: {name: 'Neurology'}}
    },
    {
        address: "Rruga Abdyl Frasheri, P. 3/3, Prane Sheshit Willson",
        avatar: "https://lakeforestgroup.com/wp-content/uploads/2014/11/doctor-profile-02.jpg",
        fullName:'Marsel Sotiri',
        email: 'marsel@gmail.com',
        employeedAt: '02/07/2008',
        gender: 'male',
        phoneNumber: '+35566228874',
        salary: 1.800,
        department: {connect: {name: 'Neurology'}}
    },
    {
        address: "Rruga Muhamet Gjollesha, Nr. 71, K. Iv",
        avatar: "https://racdoc.com/uploads/blog/1371_1625856299_doctor-thumb-02.jpg",
        fullName:'Endi Ymeri',
        email: 'endi@gmail.com',
        employeedAt: '11/02/2010',
        gender: 'male',
        phoneNumber: '+3551414142',
        salary: 3.470,
        department: {connect: {name: 'Opthalmology'}}
    },
    {
        address: "Rruga Nacionale Fier-patos Km 7",
        avatar: "https://thumbs.dreamstime.com/b/female-doctor-writing-prescription-healthcare-medical-concept-stethoscope-40530827.jpg",
        fullName:'Arita Osmani',
        email: 'arita@gmail.com',
        employeedAt: '04/08/2014',
        gender: 'female',
        phoneNumber: '+3552266954',
        salary: 4.500,
        department: {connect: {name: 'Cancer Department'}}
    },
    {
        address: "Rruga Tefta Tashko Koco, Nr. 10",
        avatar: "https://kanikit.com/wp-content/uploads/2019/03/doctor-profile03.jpg",
        fullName:'Rinor Rama',
        email: 'rinor@gmail.com',
        employeedAt: '02/04/2000',
        gender: 'male',
        phoneNumber: '+3514425620',
        salary: 6.142,
        department: {connect: {name: 'ENT Department'}}
    },
    {
        address: "Rruga Xhelal Hajda",
        avatar: "https://www.symbiosis.ae/images/doctors/Dr_Ateeque1.png",
        fullName:'Esat Hoxha',
        email: 'esat@gmail.com',
        employeedAt: '10/05/2008',
        gender: 'male',
        phoneNumber: '+35525425',
        salary: 5000,
        department: {connect: {name: 'Cancer Department'}}
    }
]
const nurses: Prisma.NurseCreateInput[] = [
    {
        address: "Rruga Rafail Dishnica",
        avatar: "https://dermamedical.net.au/wp-content/uploads/2016/05/Dermal-Filler-Anti-Wrinkle-Injection-Training-for-Nurses-790x1024.jpg",
        fullName: 'Albulena Kafexhiu',
        email: 'albulena@gmail.com',
        phoneNumber: '+383491144225',
        employeedAt: '04/02/2004',
        salary: 4.250,
        department: {connect: {name: 'ENT Department'}}
    },
    {
        address: "Rruga Qemal Stafa, Ish Artistike Migjeni",
        avatar: "https://s3.amazonaws.com/utep-uploads/wp-content/uploads/sparkle-box/2018/12/13072237/A-female-nurse-smiling-in-a-hospital-room-.jpeg",
        fullName: "Desintila Luzi",
        email: 'desintila@gmail.com',
        phoneNumber: '+3551466258',
        employeedAt: '04/08/2004',
        salary: 3.250,
        department: {connect: {name: 'Dentists'}}
    },
    {
        address: "Rruga Siri Kodra, Tek Dispanseria",
        avatar: "https://www.nursechoice.com/contentassets/b86928e07b3f4887a244ab616e54c920/contract-nursing-jobs-right-for-you.jpg",
        fullName: 'Floriana Sokoli',
        email: 'foriana@gmail.com',
        phoneNumber: '+383493654524',
        employeedAt: '07/10/2018',
        salary: 2.250,
        department: {connect: {name: 'Opthalmology'}}
    }
]
const patients: Prisma.PatientCreateInput[] = [
    {
        address: 'Rruga Mitat Hoxha',
        avatar: 'https://minimaltoolkit.com/images/randomdata/male/49.jpg',
        fullName: "Tuan Parker",
        email: "tuan@gmail.com",
        gender: "male",
        phoneNumber: "+3551472583",
        department: {connect: {name: 'Dentists'}},
        appointments: {create: [
            {payment: 250.50, treatment: "Acupuncture", doctor:{connect: {email: 'jurgen@gmail.com' }}},
            {payment: 150.20, treatment: "Ayurveda", doctor:{connect: {email: 'rinor@gmail.com'}}}
            ]
        }
    },
    {
        address: 'Rruga Pavaresia, Plazhi Iliria',
        avatar: 'https://minimaltoolkit.com/images/randomdata/male/64.jpg',
        fullName: "Ed Palmere",
        email: "palmere@gmail.com",
        gender: "male",
        phoneNumber: "+3558552147",
        department: {connect: {name: 'Opthalmology'}},
        appointments: {create: [
            {payment: 450.50, treatment: "Urotherapy", doctor:{connect: {email: 'rinor@gmail.com' }}},
            {payment: 100, treatment: "Mercury", doctor:{connect: {email: 'arita@gmail.com'}}}
            ]
        }
    },
    {
        address: 'Rruga Ibrahim Rugova',
        avatar: 'https://minimaltoolkit.com/images/randomdata/female/6.jpg',
        fullName: "Phoebe Roskowski",
        email: "phoebe@gmail.com",
        gender: "female",
        phoneNumber: "+3551002003",
        department: {connect: {name: 'Neurology'}},
        appointments: {create: [
            {payment: 150, treatment: "Homeopathy", doctor:{connect: {email: 'endi@gmail.com' }}},
            {payment: 70, treatment: "Tobacco Smoke Enemas", doctor:{connect: {email: 'artiola@gmail.com'}}}
            ]
        }
    }
]

async function createStuff() {
    await prisma.hospital.create({data: hospital})
    for(const admin of admins){
        await prisma.admin.create({data: admin})
    }
    for(const doctor of doctors){
        await prisma.doctor.create({data: doctor})
    }
    for(const nurse of nurses){
        await prisma.nurse.create({data: nurse})
    }
    for(const patient of patients){
        await prisma.patient.create({data: patient})
    }
}
createStuff()