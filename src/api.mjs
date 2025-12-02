import mongoose from "mongoose";
import express from "express"
import log from "loglevel"
import * as bcrypt from "bcrypt"

// Set log level
const levels = ["debug", "info", "warn", "error"]
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info"

log.info("Starting Container")

if (levels.includes(logLevel)) {
    log.setDefaultLevel(logLevel)
} else {
    log.setDefaultLevel("info")
}

const serverPort = process.env.PORT ? process.env.PORT : 3000

const dbHost = process.env.DB_HOST ? process.env.DB_HOST : "127.0.0.1"
const dbPort = process.env.DB_PORT ? process.env.DB_PORT : 27017


// Connect to mongodb container running on the same network
log.debug("Attempting to connect to MongoDB Server")
try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/movies`)
} catch (error) {
    log.error(`Unable to connect to MongoDB Container: ${error}`)
    process.exit(1)
}

// Set up movie schema
const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    year: Number,
    likes: Array,
    dislikes: Array,
    artLocation: String
})

const Movie = mongoose.model("Movie", movieSchema)

const userSchema = new mongoose.Schema({
    name: String,
    uid: String,
    password: String
})

const User = mongoose.model("User", userSchema)

// Initialize express server
const app = new express()
app.use(express.json())
app.use(express.static("public", { index: "index.html" }))

app.get("/movies", async (req, res) => {
    const movies = await Movie.find()
    res.json({
        "movies": movies
    })
})

// Start Express server
app.listen(serverPort, () => {
    log.info(`Listening on port ${serverPort}`)
})