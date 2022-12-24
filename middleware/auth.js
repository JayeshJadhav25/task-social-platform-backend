const jwt = require('jsonwebtoken');
const dotenv =require('dotenv');
dotenv.config();

const generateToken = async (payload) => {
    const token=await jwt.sign(payload,process.env.JWT_SECREAT);
    return token;
}

const checkAuth=async (req,res,next)=>{
    try {
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECREAT);
        console.log('decoded',decoded);
        req.user=decoded
        next()      
    }catch(e){
        res.status(401).send({error:'Please authenticate'})
    }
}
module.exports = {
    generateToken,
    checkAuth
};