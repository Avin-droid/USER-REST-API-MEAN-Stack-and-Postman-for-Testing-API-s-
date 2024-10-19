const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')
const validator=require('validator')
const jwt = require('jsonwebtoken')
const UserSchema=mongoose.Schema({
    User_Id:
    {
        type:String,
        required:true,
        unique:true
    },

    First_Name:
    {
        type:String,
        required:true,
        validate(value)
        {
            if(!validator.isAlpha(value))
            {
                throw new Error('Name Should Only Contain Alphabets')
            }
        }
    },

    Last_Name:
    {
        type:String,
        required:true,
        validate(value)
        {
            if(!validator.isAlpha(value))
            {
                throw new Error('Name Should Only Contain Alphabets')
            }
        }
    },

    Age:
    {
        type:String,
        required:true,
        default:'0',
        minage:0,
        validate(value)
        {
            if(value <0 || !validator.isInt(value))
            {
                throw new Error('Age Should Be A Positive Integer or Age should not be Lesser than 0')
            }
        }
    },

    Address:
    {
        type:String,
    },

    Email_Id:
    {
        type:String,
        required:true,
        unique:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error('Invalid Email-Id Pattern')
            }
        }
    },

    Password:
    {
        type:String,
        required:true,
        minlength:8,
        validate(value)
        {
            if(value.length<7)
            {
                throw new Error('Password length Should be Greater than 7')
            }

            if(value.toLowerCase().includes('password'))
            {
                throw new Error('You Cant Set Password as password')
            }
        }
    },
     
    Contact:
    {
        type:String,
        required:true,
        unique:true,
        minlength:10,
        validate(value)
        {
            if(value.length<10 || value.length>10 || !validator.isNumeric(value))
            {
                throw new Error('Contact Number Should be of 10 Characters')
            }

        }
    },

    tokens:[{
        token:
        {
            type:String,
            required:true,
        }
    }],

})

UserSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

UserSchema.pre('save',async function(next){
    const tempUser=this
    async function encryptedPassword()
    {
        const hashedPassword=await bcrypt.hash(tempUser.Password,8)
        console.log('Hashed-Password:'+hashedPassword)

        if(tempUser.isModified('Password'))
        {
            tempUser.Password=hashedPassword
        }
    }
    await encryptedPassword()
    console.log('Encrypted-Password:'+tempUser.Password)
    next()
})

UserSchema.statics.loginCheck=async function(Email_Id,Password)
{
    const loginUser=await this.findOne({Email_Id})
    console.log('-----------------'+loginUser)
    if(!loginUser)
    {
        //throw new Error('Invalid Email-ID ')
	return new Error('Invalid Email-ID ');
    }
    const loginpassword=await bcrypt.compare(Password,loginUser.Password)
    {
        if(!loginpassword)
        {
            //throw new Error('Invalid Password')
		return new Error('Invalid Password')
        }
    }
    return loginUser

}

UserSchema.methods.generateToken=async function()
{
    const logintoken=this
    const token=jwt.sign(
        {_id:logintoken._id.toString()},
        'Avinash7057',
        {expiresIn:"24h"}
    ) 
    console.log('Generated Token'+token)
    logintoken.tokens=logintoken.tokens.concat({token})
    await logintoken.save()
    return token
}

// UserSchema.methods.toJSON=function()
// {
//     const user=this
//     const UserObject=user.toObject()
//     delete UserObject.Password
//     delete UserObject.tokens
//     return UserObject
// }



const USER=mongoose.model('USER',UserSchema)

module.exports=USER;