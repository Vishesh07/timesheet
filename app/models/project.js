var mongoose = require('mongoose'),
Schema = mongoose.Schema,

 ProjectSchema = new Schema({
    project : {type : String, required : true, unique : true},
    description : {type: String, required : true}
});


 mongoose.model("Project",ProjectSchema);
