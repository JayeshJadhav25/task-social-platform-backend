const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Mongo Connected...');
}).catch(( err )=>{
    console.log('Err::',err);
});