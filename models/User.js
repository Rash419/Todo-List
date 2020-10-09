var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: {type: String,required: true},
    email :{type: String,required:true},
});
userSchema.virtual('url')
.get(function(){
    return '/user/'+this._id;
})

module.exports = mongoose.model('UserSchema',userSchema);