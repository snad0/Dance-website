const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/DanceContact');
var mongoose = require('mongoose');
const bodyparser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/DanceContact', {useNewUrlParser: true});

// const port=800;
// const port=process.env.PORT || 800;


//applying mongoose
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    Age: String,
    address: String,
    gender: String,
    email: String
  });
const contact = mongoose.model('Contact', contactSchema);




// app.use(express.static('static',options))
app.use('/static',express.static('static'))

app.use(express.urlencoded())


app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/', (req, res)=>{
    const params={}
    res.status(200).render("home.pug",params);
});


app.get('/contact', (req, res)=>{
    const params={}
    res.status(200).render("contact.pug",params);
});

//Changing post request on contact to set on the database
// app.post('/contact', (req, res)=>{
   
//     var myData = new contact(req.body);
//     myData.save().then(()=>{
//         res.send("This item has been saved to the database")
//     }).catch(()=>{
//         res.status(400).send("Item was not saved to the database")
//     })
//     // res.status(200).render("contact.pug");
// });




// app.listen(port, ()=>{
//     console.log(`The application started succesfully on port ${port}`);
// });
app.post('/contact',(req,res)=>{
    
    console.log(req.body);
    Name=req.body.Name
    gender=req.body.gender
    address=req.body.address
    Age=req.body.Age
    email=req.body.email
    phone=req.body.phone 
    let outputTowrite=`
     Name of the client is ${Name},
     age is ${Age},
     address is ${address},
     gender is ${gender},
     email is ${email},
     phone number is ${phone}`
    fs.writeFileSync('output.txt',outputTowrite)
    const params={"message": "your form have been submitted"}
    res.status(200).render("home.pug",params);
});

app.listen(process.env.PORT || 800)
