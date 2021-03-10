const express = require('express');
const ejs = require('ejs');
const PORT = 3000;
const mongoose = require('mongoose');
const user = require('./models/usr');
const bodyParser = require('body-parser');

//Connection to the Port 27017 for Mongodb
mongoose.connect('mongodb://localhost:27017/usersdb');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))

//Rendering index page
app.get('/', (req, res) =>{
    res.render('index');
})

//Rendering register page
app.get('/register', (req, res) =>{
    res.render('register');
})

//Rendering login page
app.get('/login', (req, res) =>{
    res.render('login');
})

//Save the new user
app.post('/register', (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const bdate = req.body.bdate;

    const newUser = new user({
        name: name,
        email: email,
        password: password,
        gender: gender,
        bdate: bdate
    })

    newUser.save((err)=>{
        err? console.log(err): res.send('successfully added');
    })

})

//Check the user's credentials if matches, proceed to login
app.post('/login', (req, res) =>{
    const email = req.body.email;
    const pass = req.body.password;
    console.log('req : ',req.body);

    user.findOne({email: email}, (err, foundResults)=>{
        if(err){
            console.log(err);
        } else {
            debugger
            if(foundResults.password === pass) {
                console.log('pass : ',pass);
                res.send('Logged in successfully!')
            } else {
                res.send('Incorrect email or password!!!!');
            }
        }
    })
})

app.listen(PORT, () => console.log('server started!'));
