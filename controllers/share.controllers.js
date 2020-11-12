const models = require('../models/index');

async function getShare(req, res) {
    var data = req.body;
    const share = await models.share.findAll();
    res.json(share);
}

async function getOneShare(req,res){
    var postId = req.params.id;
    const share = await models.share.findAll({ include:[models.user],where:{postId:postId}});
    res.json(share)
}

async function createShare(req, res) {
    var data = req.body
    const share = await models.share.create({status:data.status,userId:req.params.userId,postId:req.params.postId})
    res.json(share);
}

module.exports = {
    getShare,
    createShare,
    getOneShare
}          