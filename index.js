const express = require('express');
const path = require('path');
const app = express();

require('./db/mongo');
const userRoute = require('./routes/user.routes');
const postRoute = require('./routes/post.routes');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/user',userRoute);

app.use('/post',postRoute);

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.listen(PORT,() => {
    console.log(`server is running at ${PORT}...`);
})