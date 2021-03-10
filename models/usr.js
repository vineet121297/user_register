const mongoose = require('mongoose');
//Declare the object
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    bdate: String
})

const user = new mongoose.model("user", userSchema);

module.exports = user;