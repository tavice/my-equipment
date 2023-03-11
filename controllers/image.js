const express = require('express');
const router = express.Router();
const Equipment = require('../models/equipment.js');
const fs = require('fs');
const path = require('path');

const multer = require('multer');
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const upload = multer({ storage: storage });

const Image = require('../models/image.js');

router.get('/', (req, res) => {
    Image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagePage.ejs', { items: items });
        }
    });
});


 
router.post('/', upload.single('image'), (req, res, next) => {
 
    const obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(item)
            // item.save();
            res.redirect('/image');
        }
    });
});


module.exports = router

