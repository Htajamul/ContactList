const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/list_db');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error in db'));
db.once('open',function(){
    console.log('db is connected successfully')
})