const mongoose=require("mongoose")

const channelSchema=new mongoose.Schema({
    todo:{
        type:String,
        required:true
    }
})

const channelModel=mongoose.model("channel",channelSchema)

module.exports=channelModel