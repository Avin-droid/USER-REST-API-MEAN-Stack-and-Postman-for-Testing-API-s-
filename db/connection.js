const mongoose=require('mongoose')
const URL='mongodb://localhost:27017/User-FSG'
const con=mongoose.connect(URL)

if(con)
{
    console.log('Database Connected...')
}
else
{
    console.log('Unable to Connect to the Database!!!')
}