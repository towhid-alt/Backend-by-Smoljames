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

    //save the new user and hashed passwword to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`) //Prepared a sequel query
            const result= insertUser.run(username, hashedPassword)
            //The result variable isn’t strictly required, but it’s useful if you want to 
            // know what happened after inserting (like the new row ID or success confirmation).
        //now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello :) Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
        VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.
            JWT_SECRET, { expiresIn: '24h' })
            res.json( {token} )
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
    
})

router.post('/login', (req,res) => {
    const {username, password} = req.body
   //encrpyt the passsword
    const hashedPassword = bcrypt.hashSync(password, 8)
    try{
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        if(!user) {return res.status(404).send({message: "User not found"})}
    }catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router