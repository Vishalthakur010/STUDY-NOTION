const mongoose = require('mongoose')

const Section = new mongoose.Schema({
    sectionName:{
        type:String
    },
    subSection:[   // changed subsection to subSection
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]
})

module.exports = mongoose.model('Section', Section)