var multer = require('multer'),
    mime = require('mime'),
    crypto = require('crypto');
var fs = require('fs');
var dir = './uploads';

//var multiparty = require('connect-multiparty'),
//    multipartyMiddleware = multiparty();

module.exports = function (app){
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
            });
        }
    });
    var upload = multer({ storage: storage });
    app.use(upload.single('file'));
    //app.use(upload.fields([{
    //        name: 'files', maxCount: 10
    //    }]));
    //app.use(upload.any());
    //app.use(multipartyMiddleware);
}