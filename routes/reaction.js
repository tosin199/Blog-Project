var express = require('express');
var router = express.Router();
const controller = require("../controllers/reaction.controller.js");
    //Retrieve all reactions 
    router.get('/', controller.getreaction);
    //Create all reactions
    router.post('/',controller.createreaction);
    //Update reactions 
    router.put('/',controller.updatereaction);
    //Delete reactions
    router.delete('/',controller.destroyreaction);

// var express = require('express');
// var router = express.Router();
// var reaction = [{id:1, react:"Welcome to backend team blog"}, {id:2, react:"users subscribe"}];




module.exports = router;