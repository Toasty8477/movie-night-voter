/**
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
**/

import mongoose from "mongoose";
import express from "express"
import log from "loglevel"
import jwt from "jsonwebtoken"

// Set log level
const levels = ["debug", "info", "warn", "error"]
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info"

log.info("Starting Container")

if (levels.includes(logLevel)) {
    log.setDefaultLevel(logLevel)
} else {
    log.setDefaultLevel("info")
}

const serverPort = 3000

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
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: Number,
    likes: Array,
    dislikes: Array
})

const Movie = mongoose.model("Movie", movieSchema)

// Setup user schema
const userSchema = new mongoose.Schema({
    name: String,
    password: String
})

const User = mongoose.model("User", userSchema)

// Initialize express server
const app = new express()
app.use(express.json())
app.use(express.static("dist", { index: "index.html" }))


// Get all movies in the db
app.get("/movies", async (req, res) => {
    const movies = await Movie.find()
    res.json({
        "movies": movies
    })
});


// Add a movie to the db
app.post("/movie", async (req, res) => {
    log.info("Movie")
    const movie = new Movie({title: movieTitle,
        description: movieDescription,
        year: releaseYear,
        likes: [],
        dislikes: []})
    movie.save()
    .then(() => {
        log.debug("Saved")
        res.send("The")
    })
    .catch((e) => {
        log.error("Failed")
        res.status(500).json({
            "error": e
        })
    })
});

// Get a specific movie from the db
app.get("/movie", async (req, res) => {
    res.json({"The": "The"});
});

// Add a user to the system
app.post("/add-user", async (req, res) => {
    if (req.body) {
        const uname = req.body.username;
        const pass = req.body.password;

        const user = new User({
            name: uname,
            password: pass
        })
        user.save()
        .then(() => {
            log.debug("Added user: " + uname);
            res.append("Location", "/users/" + uname);
            res.status(201).json({
                "message": "New user created"
            })
        })
        .catch((e) => {
            log.error("Failed to create new user");
            res.status(500).json({
                "message": "Could not create new user",
                "cause": e
            })
        })
    }
});

// Authenticate a user
app.get("/auth", async (req, res) => {
    const uname = req.query.username;
    const pass = req.query.password;

    const user = await User.findOne({name: uname});
    const password = user.get("password");

    if (password === pass) {
        // Authenticate
    }
})

// Start Express server
app.listen(serverPort, () => {
    log.info(`Listening on port ${serverPort}`)
});