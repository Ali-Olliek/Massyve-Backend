import express from "express"
import bodyParser from "body-parser"
import { selectedConfig } from "./configs"
import authenticationRoutes from "./routes/authentication"
import mongoose from "mongoose"

const app = express()

app.use(bodyParser.json())
app.use("/api/auth", authenticationRoutes)

mongoose
.connect(selectedConfig.dbConnectionString).then(() => console.log("Connected to MongoDB Atlas"))
.catch(error => console.error("Error connecting to MongoDB Atlas", error))


app.listen(selectedConfig.port, ()=> {
    console.log(`App listening to http://localhost:${selectedConfig.port}`);
})