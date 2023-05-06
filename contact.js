const express = require('express') 
const Router =express.Router();
const email = require('./email');
const fs = require('fs');
const nodemailer = require("nodemailer");

// Read logo file from disk
const logoData = fs.readFileSync('./uploads/logo-ETC.png');

// const logo = require('./uploads/logo-ETC.png')
Router.post('/contact', (req,res)=>{
  try{
    const data = req.body;
   // email,subject, text, html
   console.log(data)

   const emailTo = ['ali.afifi.h@gmail.com','ali.afify93746@gmail.com']
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

  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  })
  const mailOptions = {
    from: `ETC <${process.env.USER}>`,
    to: emailTo,
    subject: 'Service Request',
    html: html,
           attachments:attatchments
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
  }catch(e){res.send(e.message)}
})

module.exports = Router