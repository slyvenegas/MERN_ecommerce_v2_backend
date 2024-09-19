const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require ('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = process.env.PORT || 3000

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Connect to DB ***")
        console.log("Server now is running *** PORT: "+PORT)
    })
})


// El archivo index.js es el punto de entrada
// para tu aplicación backend.
//  Aquí configuras el servidor, las dependencias
// necesarias, y haces que tu aplicación esté
// lista para aceptar peticiones.