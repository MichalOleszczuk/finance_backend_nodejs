exports.allowOrigins = function allowOrigins(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
}

exports.bodyValidation = function bodyValidation(req={}, ...requiredProps){
    if (!req.body) return `Missing body.`
    for (let prop of requiredProps){
        let {val: val=prop, type: type=null} = prop
        prop = {val, type}
        if (!req.body[prop.val])
            return `Missing ${prop.val}.`
        if (prop.type && typeof req.body[prop.val] !== prop.type)
            return `${prop.val} type should be ${type}.`
    }
    return null;
}

exports.sendOk = function sendOk(req, res, json){
    if(json && typeof json !== 'object') {
        throw new Error('Response payload must be an object!')
    }
    res.statusCode = 200;
    if (json){
        res.setHeader('Content-Type', 'application/json');
        res.json(json);
        return;
    }
    res.setHeader('Content-Type', "text/html");
    res.end();
};

exports.sendError = function sendError(message, code, req, res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = code;
    res.write(message);
    res.end();
};