const express = require('express');
const Router = express.Router();
const multer = require('multer');
const Product = require('./productsShcem');
var fs = require("fs");
const path = require("path");

const dir = path.resolve(__dirname, "../", "uploads");
console.log(dir) 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    console.log('file');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    console.log('ghjk',file);
    
    cb(null, `${Date.now()}_${file.originalname}` )
  }
});

const upload = multer({ storage: storage }).fields([{name:'images'},{name:'frontImage'},{name:'data'}]);

Router.post('/addProject',upload, async function (req, res) {
 
// console.log('file',req.file);
console.log('files',req.files)
   const data =JSON.parse(req.body.data);
   data.images=req.files.images;
   data.frontImage=req.files.frontImage[0];
   const newProduct=await Product.create(data)
   .catch(e=>{
     console.log(e.message)
     res.send('error while creating new product'+e.message).end()})
     await newProduct.save()
     .then(d=>{
      console.log(d)

      res.send('Files uploaded successfully!');
    })
    .catch(e=>{
      console.log(e.message)
      res.send('error while creating new product'+e.message).end()})
   // newProduct.save().catch(e=>res.send('error while creating new product'+e.message)).end()
   // req.files contains an object of files uploaded under the "images" field
  // req.body contains the data object sent with the 
});


// app.post('/projects', (req, res) => {
//   multi_upload(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//           // A Multer error occurred when uploading.
//           res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
//           return;
//       } else if (err) {
//           // An unknown error occurred when uploading.
//           if (err.name == 'ExtensionError') {
//               res.status(413).send({ error: { message: err.message } }).end();
//           } else {
//               res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
//           }
//           return;
//       }

//       // Everything went fine.
//       // show file `req.files`
//       // show body `req.body`
//       res.status(200).end('Your files uploaded.');
//   })
// });

Router.get("/products", (req, res) => {
  try {
    fetchData((data) => {
      res.status(201).send(data);
    }, Product);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = Router; 