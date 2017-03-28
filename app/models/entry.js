var mongoose = require('mongoose'),
Schema = mongoose.Schema,

 EntrySchema = new Schema({
    project : { type : Schema.ObjectId, ref : 'Project' },
    date : {type : Date, required : true},
    description : {type: String, required : true},
    hours : {type: Number, required : true}
});

 mongoose.model("Entry",EntrySchema);
