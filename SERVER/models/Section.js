const mongoose = require('mongoose')

const Section = new mongoose.Schema({
    sectionName:{
        type:String
    },
    subsection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]
})

module.exports = mongoose.model('Section', Section)