var boom = require('boom');
function getErrorMessage(err){
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            var ms=err.errmsg.substring(50);
            var msg=ms.split(" ");
            if(msg[0]=="users"){
                message = "Duplicate Employee Code Detected.";
                break;
            }             
            else{
                message = 'Duplicate Value Detected.';
                break;
            }
            case 11001:
                message = 'Already Exists.';
                break;
            default:
                message = 'Something went wrong.';
                break;
        }
        return message;
    } 
    else if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                return err.errors[errName].message;
        };
    }
    else {
        return err.message;
    }
}



exports.sendMongooseErrorMessage = function (err, res){
    var errMessage = getErrorMessage(err);
    var berr = boom.create(500, err.name, errMessage);
    berr.output.payload.data = berr.data;
    return res.boom.wrap(berr);
}

exports.sendJoiErrorMessage = function (err, res) {
    var err = boom.create(400, err.name, err.error.details);
    err.output.payload.data = err.data;
    return res.boom.wrap(err);
}