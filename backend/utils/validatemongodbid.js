const mongoose = require('mongoose')    ;

const validateMOongodbId=id=>{
    const isValid=mongoose.Types.ObjectId.isValid(id) ;
    if(!isValid)throw new Error(`Invalid user ID: ${id}`);
}
module.exports = validateMOongodbId;