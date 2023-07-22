const express = require("express")

require("dotenv").config()
require("./config/database")
const Router = require("./routs/routs")

const app = express()

const PORT = process.env.PORT || 4000


//Midlewares
app.use(express.json())
app.use("/api", Router)


app.listen(PORT, ()=> {
    console.log("SERVIDOR CONECTADO EN PUERTO " + PORT)
})