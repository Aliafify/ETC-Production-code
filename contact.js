const express = require('express') 
const Router =express.Router();
const email = require('./email');
const fs = require('fs');

// Read logo file from disk
const logoData = fs.readFileSync('./uploads/logo-ETC.png');

// const logo = require('./uploads/logo-ETC.png')
Router.post('/contact', (req,res)=>{
    const data = req.body;
   // email,subject, text, html
   console.log(data)
   const emailTo = ['ali.afifi.h@gmail.com','pmx.4.2022@gmail.com']
   const subject = data.subject
   const text = '';
   const attatchments =  [
    {
      filename: "logo-ETC.png",
      path: "./uploads/logo-ETC.png",
      cid: "logo",
    },
  ];
  const html = `<div>
  <img src="cid:logo" alt="ETC Logo" width='100px'/>
    <h1 style='color:#37B0C8'>${subject}</h1> 
  <p style='color:#283476;font-size:12pt'>${data.message}</p>
  <div>
  <ul>
  <li>${data.name}</li>
  <li>${data.email}</li>
  <li>${data.phone}</li>
  </ul> 
  
  </div></div>`;
email(emailTo,'Service Request',text,html,attatchments)
.then((data)=>{console.log('response',data)})
.catch(e=>console.log(e.message))
res.status(200).send('sent')
})

module.exports = Router