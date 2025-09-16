import express from 'express'
import bcrypt from 'bcryptjs' //Basically to encrypt our username & password using this package
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req,res) => {
    const {username, password} = req.body
    //save the username and an irreversibly encrypted password
    //save gilgemesh@gmail.com | askddd..asdsd.qwe..fg
    //using the bcrypt.js package
    const hashedPassword = bcrypt.hashSync(password, 8)
    console.log(hashedPassword)
    res.sendStatus(201)
})

router.post('/login', (req,res) => {
    const {username, password} = req.body
   //encrpyt the passsword
    const hashedPassword = bcrypt.hashSync(password, 8)

    console.log(hashedPassword)

    res.sendStatus(201)
})

export default router