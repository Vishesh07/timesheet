function parse(dt, val) {
    switch (dt) {
        case 'd':
            return new Date(val);
            break;
        case 'a':
            return val.split('.');
        default:
            return val;
    }
}
var getRestify = function () { };

getRestify.prototype.queryBuilder = function (req, res, next) {
    //for select query
    req.options = {
        select : '',
        sort : '',
        page : parseInt(req.query.page)|| 0,
        pagesize : parseInt(req.query.pagesize) || 10000,
        pageskip : 0,
        populate : [],
        where : {},
        search : ''
    }
    if (req.query.select) {
        req.options.select = req.query.select.replace(/,/g , ' ');
    }
    if (req.query.populate) {
        //req.options.populate = req.query.populate.replace(/,/g , ' ');
        //get All populated and their select
        var pop = req.query.populate.split(',');
        pop.forEach(function (item) {
            var ps = item.split(':');
            var popdata = {
                path : ps[0],
                select : ps[1].replace(/-/g , ' ')
            };
            req.options.populate.push(popdata);
        });
    }
    if (req.query.where) {
        var whr = req.query.where.split(',');
        whr.forEach(function (item) {
            var ws = item.split(';');
            if (ws[1].startsWith('$')) {
                    //split again with -
                    var cond = ws[1].split('*');
                    var key = ws[0];
                    req.options.where[key] = {};
                    cond.forEach(function (citem) {
                        var cdata = citem.split('|');
                        try {
                            req.options.where[key][cdata[0]] = parse(cdata[1], cdata[2]);
                        }
                    catch (e) {
                            console.log(e);
                        }
                   
                    });
                
            }
            else if(ws[1] != 'undefined')
                req.options.where[ws[0]] = ws[1];
        });
    }
   
    if (req.query.sort) {
        //remove comma with space
        req.options.sort = req.query.sort.replace(/,/g, ' ');
    }
    if (req.query.search) {
        var srch = req.query.search.split(',');
        srch.forEach(function (item,idx) {
            if (item.indexOf(';') > -1) {
                var ws = item.split(';');
                if (ws[1] != 'undefined') {
                    if (idx > 0) {
                        req.options.search += ' || ';
                    }
                    req.options.search += '(this.' + ws[0] + '.toLowerCase().indexOf("' + ws[1].toLowerCase() + '") !== -1)';
                }
                    
                //to do ---
                //for multiple search field either for condition or || and .
                //let use $or and $and
            }
            else {
                if (item != 'undefined')
                req.options.search += 'this.title.toLowerCase().indexOf("' + item.toLowerCase() + '") !== -1';
            }
            
        });
        //req.options.search = 'this.title.indexOf("op") !== -1';

    }
    if (!req.options.search) {
        req.options.search = 'this';
    }
    if (req.options.page) {
        req.options.pageskip = req.options.pagesize * req.options.page;
    }
   
    next();
};

module.exports = new getRestify();
