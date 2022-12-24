const {postService} = require('../services');
const config = require('../config/status');
const {validate} = require('../utils');

const create = async (req,res) => {
    try {


        const { title,type,content } = req.body;
        const validateFields = {
            title:'required|string',
            type:'required|string',
            content:'required|string',
        }
        const checkFields = await validate.validateData(req.body,validateFields);
        if(checkFields.success) {
            const url = req.protocol + '://' + req.get("host");
            var postPicUrl;
            if(req.file != undefined) {
                req.body.postPic = url + '/uploads/' + req.file.filename;
            }
            const result = await postService.createPost(req.user,req.body);
            res.status(result.statusCode).json(result); 
        } else {
            res.status(config.STATUS.BAD_REQUEST).json({success:false,result:checkFields})
        }
    }catch(err) {
        console.log("Err::",err)
        res.status(config.STATUS.SERVER_ERROR).json({err:err,success:false})
    }
}

const likePost = async(req,res) => {
    try {
        const { postId } = req.body;
        const validateFields = {
            postId:'required|string'
        }
        const checkFields = await validate.validateData(req.body,validateFields);
        if(checkFields.success) {
            const result = await postService.likePost(postId,req.user.id);
            // res.status(result.statusCode).json(result); 
            res.status(200).json(result); 
        } else {
            res.status(config.STATUS.BAD_REQUEST).json({success:false,result:checkFields})
        }

    }catch(err) {
        console.log("Err::",err)
        res.status(config.STATUS.SERVER_ERROR).json({err:err,success:false})
    }
}

const getPostsOfLoginUser = async(req,res) => {
    try {
        const result = await postService.getPostsOfLoginUser(req.user.id);
        res.status(result.statusCode).json(result); 
    } catch(err) {
        console.log("Err::",err)
        res.status(config.STATUS.SERVER_ERROR).json({err:err,success:false})
    }
}

const allPostWithAuthorDetails = async(req,res) => {
    try {
        const result = await postService.allPostWithAuthorDetails(req.user.id);
        res.status(result.statusCode).json(result); 
    } catch(err){
        console.log("Err::",err)
        res.status(config.STATUS.SERVER_ERROR).json({err:err,success:false})
    }
}
module.exports = {
    create,
    likePost,
    getPostsOfLoginUser,
    allPostWithAuthorDetails
}