const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv'); // it helps us to manage enviroment variables(which basically consistes of sensitive data) in a secure way.

const app = express();
const port = 3000;
//require('dotenv').config();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const route = express.Router();

//ceate reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port:465,
    host: "smtp.gmail.com",
    auth: {
        user:'arpitaroy2089@gmail.com',
        pass:'gcvh xyiz vkct bqnd',
    },
    secure: true,
});

route.post('/expmail',(req,res)=>{
    const{to,subject,text}=req.body;
    const mailInfo = {
        from: 'arpitaroy2089@gmail.com',
        to:to,
        subject:subject,
        text:text,
        //to: 'arpitaroy2089@gmail.com',
        //subject: 'Sending email using Express Node Js',
        //text:'Hurray it was easy application',
        //html:'<h1>Hello User, We have been successfully able to send an email for the very FIRST time.</h1>',
        //html:'<h1>Hello User, We have been successfully able to send an email for the SECOND time.</h1>',
    };

    transporter.sendMail(mailInfo, function(err, info){
        if(err)
            return console.log(err);
        else
            res.status(200).send({message:"Mail send", message_id:info.message});
    });
});

app.use('/a1', route);

app.listen(port,()=>{
    console.log(`Server listenting on the port ${port}`);
});
