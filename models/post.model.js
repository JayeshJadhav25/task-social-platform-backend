const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    postType:{
        type:String,
        required:true,
        trim:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    postPic:{
        type:String
    },
    likedUsers: [{type:String}]
})

const Post = mongoose.model('Post',postSchema);

module.exports  = Post  