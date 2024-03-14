const mongoose = require("mongoose")
const Schema =  mongoose.Schema

const userModel = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
       url:{
        type:String,
        required:true
       },
       pid:{
        type:String,
        required:true
       }
    },
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        mca:{
            type:Boolean,
            required:true,
            default:false
        },
        bca:{
            type:Boolean,
            required:true,
            default:false
        },
        bsc:{
            type:Boolean,
            required:true,
            default:false
        }
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    },
    createdAt:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("employee",userModel)
