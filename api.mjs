import mongoose from "mongoose";
import express from "express"

// Set log level
const levels = ["debug", "info", "warn", "error"]
const logLevel = process.env.LOG_LEVEL

const serverHost = process.env.HOST
const serverPort = process.env.PORT

const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT


// Connect to mongodb container running on the same network
try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/movies`)
} catch (error) {
    if (logLevel === "error") {
        console.error(`Unable to connect to MongoDB Container: ${error}`)
    }
    process.exit(1)
}

// Initialize express server
const app = new express()
app.use(express.json())
app.use(express.static("public", { index: "index.html" }))


// Start Express server
app.listen()