var mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');
Schema = mongoose.Schema,

 UserSchema = new Schema({
    firstname : {type : String, required : true, unique : true},
    lastname : {type : String, required : true, unique : true},
    username : {type : String, required : true, unique : true},
    // email : {type : String, required : true},
    // password : {type : String, required : true},
    mobile : {type : Number, required : true },
    address : {type: String, required : true}
});

UserSchema.plugin(passportLocalMongoose);


 mongoose.model("User",UserSchema);
