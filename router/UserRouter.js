const express=require('express')
const Users=require('../models/main')
const auth=require('../Authorization/auth')
const USER = require('../models/main')
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('Welcome...')
})

router.post('/user/add',async(req,res)=>{
    const temp=new Users(req.body)
    console.log('Current User'+temp)

    try
    {
        const record=await temp.save()
        if(record)
        {
            res.send(record)
        }
    }catch(error)
    {
        res.send(error)
    }
})

router.get('/user/viewuser',auth, async(req,res)=>{
    const _id=req.userrecord._id

    const UserDetails=await Users.find({_id})
    if(UserDetails)
    {
        console.log('User Record')
        res.send(UserDetails)
    }
    else
    {
        res.send('No User Records Found...')
    }
})

router.post('/user/login',async(req,res)=>{
    const CurrentUser=await Users.loginCheck(req.body.Email_Id,req.body.Password)
    console.log('login check result'+CurrentUser)
    try{
    if(!CurrentUser)
    {
        res.send('Invalid Email-ID or Password')
    }
    const token=await CurrentUser.generateToken()
    res.send({CurrentUser,token})
    }catch(e){
	res.send(e)
	}
})

router.post('/user/logout',auth,async(req,res)=>{
    try
    {
        req.userrecord.tokens=req.userrecord.tokens.filter((token)=>{
            return token.token!==req.token
        })
        console.log(req.userrecord.tokens)
        await req.userrecord.save()
        res.send({})
    }catch(error)
    {
        res.send({error:'User Already Logged Out'})
    }
})

router.post('/user/logoutall',auth,async(req,res)=>{

    try
    {
        req.userrecord.tokens=[]
        await req.userrecord.save()
        res.send({})
    }
    catch(error)
    {
        res.send({error:'Already Logged Out from All Devices'})
    }
})

router.delete('/user/removeuser',auth,async (req,res)=>{
    try
    {
        await req.userrecord.deleteOne()
        console.log('--Record Deleted--'+req.userrecord)
        res.send('User Record Deleted Succesfully from Database...')
    }catch(error)
    {
        res.send({error:'Login Again...'})
    }
})

router.put('/user/UpdateUser',auth,async(req,res)=>{
    try
    {
        const updates=Object.keys(req.body)
        console.log(updates)
        for(let feild of updates)
        {
            if(feild === 'Email_Id' || feild === 'Password')
            {
                //res.send({error:'Cannot Update Email-Id or Password'})
                throw new Error('Can not update email....')
            }
        }
        updates.forEach((update)=>{
            req.userrecord[update]=req.body[update]
        })
        await req.userrecord.save()
        res.send(req.userrecord)
        console.log('at end...')
    }catch(error)
    {
        res.send('can not update email or password')
    }
})

module.exports=router;