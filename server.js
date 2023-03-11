//Dependencies
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const equipmentController = require('./controllers/equipment.js');
const imageController = require('./controllers/image.js');
const session = require('express-session');
require('dotenv').config();

//get rid of deprecations warning
mongoose.set('strictQuery', false);


//Session Secret setup
const SESSION_SECRET = process.env.SESSION_SECRET
console.log('here is the session secret')
console.log(SESSION_SECRET)
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));


//mongdb connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true, 
});

const db = mongoose.connection
db.on('error', (err)=> console.log(`${err.message} MongoDB Not Running!`));
db.on('connected', ()=> console.log('mongo connected'));
db.on('disconnected', ()=> console.log('mongo disconnected'));


//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/equipment', equipmentController)

app.use('/image', imageController)
app.use(express.static('public'));



//Port
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('listening on port', PORT);
});
