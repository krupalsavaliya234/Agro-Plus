const mongoose = require("mongoose");

// Correct the variable name to process.env.DATABASE
const DB = process.env.DATABASE;

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection is successfully done"))
    .catch((error) => console.log("Error: " + error.message));