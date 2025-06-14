const mongoose= require('mongoose')
const TaskSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'must provide nane'],
        trim:true, 
        maxLength:[20, 'name cannot be more than 20 characters']
    },
    completed:{
    type:Boolean, 
    default: false, 
    }
})

module.exports= mongoose.model('Task', TaskSchema)