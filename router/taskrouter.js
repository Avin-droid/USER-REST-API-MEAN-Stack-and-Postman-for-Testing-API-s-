const express=require('express')
const Task=require('../models/task')
const auth=require('../Authorization/auth')
const router=new express.Router()


router.post('/tasks/addtask',auth,async(req,res)=>{

        const newtask=new Task({
            ...req.body,
            owner:req.userrecord._id
        })
        console.log(newtask)
        await newtask.save().then((data)=>{
            res.send(data)
        }).catch((error)=>{
            res.send("cannot add task!!!")
        })
})

router.get('/tasks/singletask/:id',auth,async(req,res)=>{
    const tid=req.params.id 
    //params:-it is an type of URL parameters which we use in routes to retrieve a specific information from the database as per user choice
    //for eg req.params.id=the object id(_id) which is generated when user enters all the required feilds and from(which is 
    //server generated)that Object_id we can retrieve any specific information which we as a user wants to
    //req.params.id:66e6df55d44b5e6af08d4c33(Object _id which is system generated)
    
    const obj=await Task.findOne({_id:tid})
    if(obj)
    {
        res.send(obj)
        console.log(obj)
    }
    else
    {
        res.send('Task not added in the database!!!')
    }

})

// router.get('/tasks/viewAlltask',auth,async(req,res)=>{
//     const alltask=await Task.find({owner:req.userrecord._id})
//     if(alltask)
//     {
//         res.send(alltask)
//         console.log(alltask)
//     }
//     else
//     {
//         res.send('No task added in the database!!!')
//     }
// })


router.get('/tasks/viewAlltask',auth,async(req,res)=>{
    let match={}
    if(req.query.completed)
    {
        match.completed=req.query.completed==='true'
    }
    else
    {
        match={}
    }
    try
    {
        await req.userrecord.populate({
            path:'tasks',
            match
        })
        res.send(req.userrecord.tasks)
    }catch(e)
    {
        res.status(500).send(e)
    }
})

router.delete('/tasks/deleteSingletask/:id',auth,async(req,res)=>{
    const tid=req.params.id
    const obj=await Task.findByIdAndDelete({_id:tid})
    if(obj)
    {
        res.send(obj)
        console.log(obj)
    }
    else
    {
        res.send('Task not found!!!')
    }
})

router.delete('/tasks/deleteallTask',auth,async(req,res)=>{
    const deleteall=await Task.deleteMany({owner:req.userrecord._id})
    if(deleteall)
    {
        res.send('All Task Deleted From the Database'+deleteall)
        console.log(deleteall)

    }
    else
    {
        res.send('No Task Found')
    }
})

router.put('/tasks/UpdateTask/:id',auth,async(req,res)=>{
    try 
    {
        const updatetask=Object.keys(req.body)
        console.log(updatetask)

        for(let value of updatetask) 
        {
            if(value === 'description') 
            {
                throw new Error('Cannot Update Description of a Specified Task...')
            }
        }

        //const taskid=req.params.id
       // const task = await Task.findById({_id:taskid})

        const task=await Task.findById(req.params.id)
        if(!task) 
        {
            return res.send({error:'Task Not Found Please Try Again...'})
        }
        
        // if(req.userrecord) 
        // {
        //     updatetask.forEach((update)=>{  req.userrecord[update] = req.body[update]})
        //     await req.userrecord.save()
        // }
        // return res.send({message:'Task Updated Successfully...',task})

        updatetask.forEach((update)=>{ task[update] = req.body[update]})
        await task.save()
        res.send(task)

    }catch(error) 
    {
        return res.send('Some Error Occurred while Updating Task!!!'+error)
    }
})


module.exports=router;