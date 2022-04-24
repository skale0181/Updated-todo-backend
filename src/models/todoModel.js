const mongoose = require("mongoose");

const todoschema = new mongoose.Schema(
    {

      
        title: {type:String},
        description: {type:String},
        subtasks: [{type:String}],
        status: {type:String},
        tags: {
          official: {type:Boolean, default:false},  
          personal: {type:Boolean, default:false},
          others: {type:Boolean, default:false},  
        },
        date: {type:String},
        user_id: { type: String, required: false },
    
      
    }

)

module.exports = mongoose.model("todo", todoschema);