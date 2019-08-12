const express = require('express');
const db = require('./mongoose.js');
const ejs = require('ejs');
const path = require('path');
const Contact = require('./contact.js');

const port = 8001;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./views'));

//set the middle ware to parse the request
app.use(express.urlencoded());

var contactList = [
    
]

app.get('/', (req, res)=> {

    Contact.find({}, function(err, contactUserList){
        if(err){
            console.log('Error during retrieval');
            return;
        }else{
            console.log(contactUserList);
            contactList = contactUserList;
            return res.render('home',{
                title: 'My Contact',
                contactList: contactList
            });
        }
        
    });

    
}

);


app.post('/add-contact',(req, res)=>{
    console.log('Add contact');

    let user = new Contact({
        name:req.body.name,
        phone:req.body.phone
    });

  
    user.save( function(err){
        if(err){console.log('Error in creating a contact!')
            return;}

            contactList.push(user);
            return res.redirect('/');
    });
});


app.get('/delete-contact/:id', (req, res) => {

    
    console.log(req.params);
    Contact.findByIdAndRemove({_id:req.params.id}, function(err){
        if(err) throw err;
        console.log('Sucessfully deleted the record');
    })
    return res.redirect('/');
});

app.listen(port, function(){
    console.log("Server listening on the port");
})


