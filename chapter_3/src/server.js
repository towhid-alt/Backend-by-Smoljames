import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

//Gives the full URL of the current module
// fileURLToPath(...)-> Converts the URL into normal file path
const __filename = fileURLToPath(import.meta.url)
//Extracts just the folder name  
const __dirname = dirname(__filename)


//Middleware --> Like a rule that runs for every request
app.use(express.json())
//Serves the HTML file or any other requested files from the /public directory
// Tells express to serve all the files from the public folder as static assets/
//files. Any requests for the css files will be resolved to the public directory.
//express. static()-> Built-in Express function that serves files directly.
app.use(express.static(path.join(__dirname, '../public')))//IMPORTANT

//Routes
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(PORT, () => {
    console.log(`Server has started on port:${PORT}`)
})