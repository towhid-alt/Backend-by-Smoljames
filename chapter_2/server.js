//The address of this server connected to the network is:
//URL -> http://localhost:8383
const express = require('express')
const app = express()
const PORT = 8383

let data =  ['james'] //JavaScript object literal
//This is acting as a database for us


//MIDDLEWARE
app.use(express.json())


//HTTP VERBES && Routes (or path)

app.get('/', (req,res) => {
    //this is endpoint number 1 - /
    console.log(`Yay! I have hit an endpoint`,req.method)
    //In here we can define some code to handle that incoming request
    res.sendStatus(200)
})

app.get('/dashboard', (req,res) => {
    console.log(`Yay! I have hit the dashboard endpoint`,req.method)
    res.send('hi')
})

//Type 1 - Website endpoints (these endpoints are for sending back html
//and they typically come when a user enters a url in a browser)

app.get('/homepage', (req, res) => {
    res.send('<h1>homepage</h1>')
})

//Type 2 - API endpoints (non visual)
app.get('/api/data', (req,res) => {
    console.log('This one was for data')
    res.send(data)
})

app.post('/api/data', (req, res) => {
    //someone wants to create a user (for example when they click a sign up
    //button)
    //the user clicks the sign up button after entering their credentials,and
    //there browser is wired up to send out a network request to the server to
    //handle that action
    const newEntry = req.body
    console.log(newEntry)
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.pop('We deleted the element off the end of the array')
    res.sendStatus(203)
})

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))