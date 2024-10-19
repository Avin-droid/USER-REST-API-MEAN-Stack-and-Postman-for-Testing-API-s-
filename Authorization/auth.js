const jwt=require('jsonwebtoken')
const Users=require('../models/main')

const auth= async function(req,res,next)
{
    const loginsToken=req.header('Authorization').replace('Bearer ','')
    console.log('Token:'+loginsToken)
    const verifiedToken=jwt.verify(loginsToken,'Avinash7057')
    console.log('Verified-Token'+verifiedToken)
    const FindUserRecord=await Users.findOne({_id:verifiedToken._id,'tokens.token':loginsToken})
    req.userrecord=FindUserRecord
    req.token=loginsToken
    next()
}
module.exports=auth;
