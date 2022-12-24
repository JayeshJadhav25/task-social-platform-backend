const config = require('../config/status');
const {userService} = require('../services');
const { validate } = require('../utils');

const register = async (req,res) => {
    try {
        let { name,email,password } = req.body;
        let validateFields = {
            name:'required|string',
            email:'required|string',
            password:'required|string'
        }
        const checkFields = await validate.validateData(req.body,validateFields);
        if(checkFields.success) {
            const result = await userService.createUser(req.body);
            res.status(result.statusCode).json(result); 
        } else {
            res.status(config.STATUS.BAD_REQUEST).json({success:false,result:checkFields})
        }

    } catch(err) {
        console.log("Err::",err)
        res.status(config.STATUS.SERVER_ERROR).json({err:err,success:false})
    }
}

const login = async (req,res) => {
    try {
        let { email,password } = req.body;
        let validateFields = {
            email:'required|string',
            password:'required|string'
        }
        const checkFields = await validate.validateData(req.body,validateFields);
        if(checkFields.success) {
            const result = await userService.login(req.body);
            res.status(result.statusCode).json(result); 
        } else {
            res.status(config.STATUS.BAD_REQUEST).json({success:false,result:checkFields})
        }

    }catch(err) {
        console.log("Err::",err)
        res.status(config.STATUS.SERVER_ERROR).json({err:err,success:false})
    }
}

module.exports = {
    register,
    login
}