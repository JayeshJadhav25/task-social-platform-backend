const {Post} = require('../models');
const config = require('../config/status');
const { default: mongoose } = require('mongoose');
const createPost = async(userObj,body) => {
    try {
        let postObj = {
            title:body.title,
            postType:body.type,
            content:body.content,
            userId:userObj.id,
            author:userObj.name,
            postPic:body.postPic ? body.postPic :''
        }
        const result = await Post.create(postObj);
        return {
            success:true,
            statusCode:config.STATUS.CREATED,
            result:result,
            message:'Post Created Succesfully..'
        } 

    } catch (err) {
        console.log('Err::',err)
        return {
            success:false,
            statusCode:config.STATUS.BAD_REQUEST,
            result:{},
            err:err,
            message:'Something Went Wrong'
        } 
    }

}

const likePost = async(pid,userId) => {
    const post = await getPost(pid);
    if(post === null) {
        return {
            success:false,
            statusCode:400,
            message:'Post Not Found.',
            result:{}
        }
    }
    const {likedUsers} = post;

    if(!likedUsers.includes(userId)) {
        likedUsers.push(userId);
    }
    post.likedUsers = likedUsers;
    await post.save();

    return {
        success:true,
        statusCode:200,
        message:'Posts Like succesfully',
        result:{}
    };
}
const getPost = async(pid) =>{
    console.log('getPost',pid,typeof(pid))
    const post = await Post.findById(pid);
    return post;
}

const getPostsOfLoginUser = async (userId) => {
    const result = await Post.find({
        userId:userId
    })
    return {
        success:true,
        result:result,
        message:"All Posts",
        statusCode:config.STATUS.OK
    };
}

const allPostWithAuthorDetails = async() => {
    const result = await Post.aggregate([
        {
          '$lookup': {
            'from': 'users', 
            'localField': 'userId', 
            'foreignField': '_id', 
            'as': 'authorDetailss'
          }
        }
      ])

      console.log('result',result)
      return {
        success:true,
        statusCode:config.STATUS.OK,
        message:'All Posts With Author Details',
        result:result
      }
}
module.exports = {
    createPost,
    likePost,
    getPostsOfLoginUser,
    allPostWithAuthorDetails
}