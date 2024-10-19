const express=require('express')
const PORT=2000
require('./db/connection')
const Taskrouter=require('./router/taskrouter')

const Userrouter=require('./router/UserRouter')
const server=express()

server.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*') //allow all domains
    res.setHeader('Access-Control-Allow-Methods','GET, PUT, POST, DELETE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With, Content-Type,Authorization')
    next();
})
server.use(express.json())
server.use(Userrouter)
server.use(Taskrouter)

server.listen(PORT,()=>{
    console.log(`URL:http://localhost:${PORT}`)
})