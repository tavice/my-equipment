const express = require('express');
const router = express.Router();
const Equipment = require('../models/equipment.js');



//Image upload - Strech goal will come back to it later having issue with img.data it doesn't convert to a string but is saved in the database
//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
//determines the directory where uploaded files will be stored, and a filename function that determines the name of the file on disk.
// we want to use the multer middleware and the use of the single method to extract the uploaded file from the request.

// const multer = require('multer'); //for file upload https://expressjs.com/en/resources/middleware/multer.html
// const path = require('path');
// const fs = require('fs');


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads")
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split("/")[1];
//         cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//       },

//});

//use fileFilter function to the multer configuration object to only accept files of a certain type
// const fileFilter = function (req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'));
//     }
//     cb(null, true);
// };


// const upload = multer({ 
//     storage: storage, 
//     fileFilter: fileFilter,
// });





// Seed
//const equipmentSeed = require('../models/seed.js');

// router.get('/seed', (req, res) => {
// 	Equipment.deleteMany({}, (error, allEquipment) => {});

// 	Equipment.create(equipmentSeed, (error, data) => {
// 		res.redirect('/equipment');
// 	});
// });





//Routes - Induces
//Index
router.get('/', function (req, res) {
    Equipment.find({}, function (err, allEquipment) {
        if (err) {
            console.log(err);
        } else {
            res.render('index.ejs', { equipment: allEquipment });
        }
    });
});



//New
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

//Delete
router.delete('/:id', (req, res) => {
    Equipment.findByIdAndDelete(req.params.id, (err, deletedEquipment) =>{
        if(err){
            console.log(error)
            res.send(error)
        } else {
            //redirect to the index page i fthe delete is successful
            console.log(deletedEquipment)
            res.redirect('/equipment')
        }
    })
})

//Update

router.put('/:id', (req, res) => {
 
    if (req.body.isDriveable === 'on') {
        req.body.isDriveable = true;
    } else {
        req.body.isDriveable = false;
    }

    
 
   Equipment.findByIdAndUpdate(req.params.id, req.body, {new: true,}, (err, updatedEquipment) => {
    
    
        if(err){
            console.log(err)
            res.send(err)
        } else {
            console.log(updatedEquipment)
            res.redirect(`/equipment/${updatedEquipment._id}`) //to redirect to the updated equipment
        }
   })
})

//Create


router.post('/', (req, res) => {


    if (req.body.isDriveable === 'on') {
        req.body.isDriveable = true;
    } else {
        req.body.isDriveable = false;
    }

    // Use the buffer property of req.file to access the file data
    const newEquipment = {
        year: req.body.year,
        description: req.body.description,
        model: req.body.model,
        purchase: req.body.purchase,
        isDriveable: req.body.isDriveable,
        location: req.body.location,
        lat: req.body.lat,
        long: req.body.long,
        currentUser: req.body.currentUser,
        typeEquipment: req.body.typeEquipment
    };

    Equipment.create(newEquipment, (error, createdEquipment) => {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            //createdEquipment.save()
            console.log(createdEquipment.location.lat + "AND" + createdEquipment.location.long)
            console.log(createdEquipment);
            // console.log(createdEquipment.img.data.buffer)


            res.redirect('/equipment');
        }
    });
});


//Edit

router.get('/:id/edit',  (req, res)=>{
    Equipment.findById(req.params.id, (err, foundEquipment)=>{ 
       if(err){
        console.log(err)
        res.send(err)
       } else {
        res.render('edit.ejs', {
            equipment: foundEquipment
        })
       }
    })
})



//Show
router.get('/:id', (req, res) => {
    Equipment.findById(req.params.id, (err, foundEquipment) => {
        res.render('show.ejs', {
            equipment: foundEquipment
        })

    })
})






module.exports = router