
const { User } = require('../models');
const config = require('../config/status');
const auth = require('../middleware/auth');

const createUser = async(body) => {
    if (await User.isEmailTaken(body.email)) {
        return {
            success:false,
            message:'Email Already Exist..',
            statusCode:config.STATUS.BAD_REQUEST,
            result:{}
        }
    } else {
        let result = await User.create(body);
        return {
            result,
            success:true,
            statusCode:config.STATUS.CREATED,
            message:'User Succesfully Created..'
        }
    }
   
}

const login = async(body) => {
    const user = await getUserByEmail(body.email);
    if (!user || !(await user.isPasswordMatch(body.password))) {
        return {
            success:false,
            message:'Incorrect Email Or Password',
            result:{},
            statusCode:config.STATUS.NOT_FOUND
        }
    } else {
        const payload = {
            id:user._id.toString(),
            email:user.email,
            name:user.name
        }
        const token = await auth.generateToken(payload);
        return {
            success:true,
            message:'Login Succesfully..',
            tokem:token,
            statusCode:config.STATUS.OK
        }
    }
}

const getUserByEmail = async (email) => {
    const result = await User.findOne({email});
    return result;
}
module.exports = {
    createUser,
    login
}