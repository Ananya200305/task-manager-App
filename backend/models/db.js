const mongoose = require("mongoose")

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL).then(()=> {
    console.log("Connected to the database mongo")
}).catch((err) => {
    console.log("Error connecting to the database", err)
})