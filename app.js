
const mysql =require("mysql2")
const Prisma = require('prisma/prisma-client')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const prisma = new Prisma.PrismaClient()

app.get('/users', async (req, res) => {
    try {
      const allUsers = await prisma.user.findMany();
      res.status(200).json({ message: 'Success', allUsers });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting users', error: err });
    }
  });

  app.post('/create',async(req,res)=>{
    try {
        const user = await prisma.user.create({
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          age:req.body.age,

        }
      });
      res.status(200).json({ message: 'User created', user });
    }
    catch (err) {
      console.error(err);
    }
  })
  app.put('/user/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age:req.body.age
        },
      });
      res.status(200).json({ message: 'user updated', user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating user', error: err });
    }
  });
  
  app.delete('/user/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(200).json({ message: 'USer deleted', deletedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });
  app.post('/house',async(req,res)=>{
    try {
        const newHouse = await prisma.house.create({
        data: {
            address: req.body.address,
            wifiPassword: req.body.wifiPassword,
            ownerId:req.body.ownerId,
            builderId:req.body.builderId

        }
      });
      res.status(200).json({ message: 'User created', newHouse });
    }
    catch (err) {
      console.error(err);
    }
  })
  app.post('/house/many',async(req,res)=>{
    const house = await prisma.house.createMany({data:req.body})
    res.json(house)
  })

  app.get('/house', async (req, res) => {
    try {
      const allHouse = await prisma.house.findMany({
        include:{
          owner:true,
          builder:true
        }
      });
      res.status(200).json({ message: 'Success', allHouse });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting users', error: err });
    }
  });

  app.get('/house/:id',async(req,res)=>{
    try{
      const house = await prisma.house.findUnique({
        where : {
          id: req.params.id
        },
        include:{
          owner:true,
          builder:true
        }
      })
      res.status(200).send({"Details":house})
    }
    catch{
      res.send("Error")
    }
  })

app.use(express.json())
  app.listen(9000,()=>{
    console.log("Server Started")
})




//npx prisma migrate dev --name create-houses-table

//git push

//git pull(public to local)
