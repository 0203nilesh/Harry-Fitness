const path= require('path');
const pug= require('pug');
const express= require('express');
const bodyparser= require('body-parser')
const port= 80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

// Creating the Schema for this contact folder.
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    dsc: String
  });

const contact = mongoose.model('contact', contactSchema);

const app=express();
//EXPRESS SPECIFIC STUFFS 
app.use('/static', express.static('static')) //to serve the template
app.use(express.urlencoded()) //to get the data using the  form

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the view directory

// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("This item is have been added to the Database.")
    }).catch(()=>{
        res.status(400).send("The Items was not saved to the database.");
    });
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The Application is running  succesfully on port: ${port}`)
})