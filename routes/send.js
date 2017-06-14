var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");

var registrated = [];

router.post('/', function(req, res, next) {
    var body = req.body;
    
    if(body.secret === "") {
        var user = registrated[body.username];
        if(!user || body.password !== user.password)
            return res.json({"message": "Username or password was not valid"});

        var bytes  = CryptoJS.AES.decrypt(user.secret, body.password);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);

        res.json({"message": plaintext});
    } 
    else {
        var encryptedsecret = CryptoJS.AES.encrypt(body.secret, body.password);

        registrated[body.username] = {"username": body.username, "password":body.password, "secret":encryptedsecret.toString()};

        console.log(registrated);

        res.json({message:"Succesfully encrypted message"});
    }
});

module.exports = router;
