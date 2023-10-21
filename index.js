const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const contact=require('./models/contact')
const port = 8000;
const app = express();
app.use(express.urlencoded());  // in built Mv
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))   //-->path.join(__dirname,'views') means path.join() function
                                                //    which joins current dir(__dirname or c\user\dell\nodejs\contactlist2\index.js) to the views folder


 app.use(express.static('assets'));     // we created new folder assets inside it there is two files css and js so that we use this 

const ContactList = [
    {
        name:"tajamul",
        phone:"6005123114"
    },
    {
        name:'younis',
        phone:"7006343434"
    },
    {
        name:'hussain',
        phone:"1234567890"
    }
]

app.get('/',async function(req,res){
    try{
        const contacts  = await contact.find({})
        return res.render('home',{
                    title:'contactList',
                    Contact_list:contacts
                });
    }
    catch(err){
        console.log('error');
        return res.send(err)
    }
    
    // return res.render('home',{
    //     title:'contactList',
    //     Contact_list:ContactList
    // });
});

app.post('/create',async function(req,res){
    // console.log(req.body)
    // ContactList.push(req.body)
    
    const newContact = await contact.create({
        name: req.body.name,
        phone: req.body.phone
      });
    
      console.log('*****', newContact);
      return res.redirect('back');
})

     // FOR params==========================
app.get('/delete-contact/:phone',async function(req,res){
    // get the id from prams in the url
    let id=req.params.phone;
    console.log(id)
    //find the contact in the db using id and dlete it
    const doc = await contact.findByIdAndDelete(id);
    return res.redirect('back');


    //==================delete the contact locally not in da

    // let contactIndex =  ContactList.findIndex(contact=>contact.phone==phone);
    // if(contactIndex!= -1){
    //     ContactList.splice(contactIndex,1);
    // }
    // console.log(ContactList)
    // return res.redirect('back');

    
});



      // FOR query params=============================
// app.get('/delete-contact', async function(req,res){
//     get the id from query prams in the url
//     let id = req.query.id;
//     //console.log(id);
//     find the contact in the db using id and dlete it
//     const doc = await contact.findByIdAndDelete(id);
//     return res.redirect('back');

       //========================delete the contact locally not in db===

//     // console.log(req.query)
//     // let phone=req.query.phone;
//     // let contactIndex = ContactList.findIndex(contact=>contact.phone==phone);
//     // if(contactIndex!= -1){
//     //     ContactList.splice(contactIndex,1);
//     // }
//     // return res.redirect('back')
// })

app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('my express server is running port :',port)
})



//"start":"nodemon index.js"
