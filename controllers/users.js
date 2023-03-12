const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/users.js')





//Sign Up Route
//GET route access to the signup.ejs page
router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
})


//POST route to create new user
router.post('/signup', (req, res) => {

    //assign the ''entered value'' in the form to req.body
    const { userName, email, password, role } = req.body;

    //set salt and bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
 
    //check if username already exisits

    User.findOne({ userName }, (err, userExists) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }
  
      if (userExists) {
        return res.status(400).send('Username already taken');
      }
  
      //create a newUser using or User schema and the hashed p
      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
        role,
        createdAt: Date.now(),
      });
  
      newUser.save((err, savedUser) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }
  
        //Strech goal different views whether you are an admin or just a visitor (for example you don't have the edit and delete button if you are a visitor)
        if (savedUser.role === 'admin') {
          res.redirect('/equipment');
        } else {
          res.redirect('/equipment');
        }
      });
    });
  });



//Sign in route
//GET sign in
router.get('/signin', (req, res) => {
    res.render('users/signin.ejs')
})

//POST sign in
router.post('/signin', (req, res) => {
    //we need to ge the user with that username
    User.findOne({ userName: req.body.userName }, (err, foundUser) => {
        if (foundUser) {

            //compareSync

            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)

            if (validLogin) {
                req.session.currentUser = foundUser

                res.redirect('/equipment')
            } else {
                res.send('invalide username or password')
            }


        } else {

            res.send('invalide username or password')

        }
    })
})





module.exports = router