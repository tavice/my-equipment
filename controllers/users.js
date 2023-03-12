const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/users.js')





//Sign Up Route
//get access to the signup.ejs page
router.get('/signup', (req, res) => {
	res.render('users/signup.ejs')
})

// POST route when you sign up a user and need to save it to the database
router.post('/signup', (req, res) => {
    // Get form data from request body
    const { userName, email, password, role } = req.body;
  
    // Create a new user with the submitted data
    const newUser = new User({
        userName,
      email,
      password,
      role // Use the selected role
    });
  
    // Save the user to the database
    newUser.save()
      .then(user => {
        // Redirect to the appropriate page based on the user's role
        if (user.role === 'admin') {
          res.redirect('/equipment/new');
        } else {
          res.redirect('/equipment');
        }
      })
      .catch(err => {
        console.error(err);
        res.redirect('/signup'); // Show error message or form again
      });
  });





module.exports = router