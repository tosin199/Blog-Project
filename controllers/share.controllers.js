const models = require('../models/index');


async function getShare(req,res){
    var postId = req.params.id;
    const share = await models.share.findAll({ include:[models.user],where:{postId:postId}});
    res.json({'status':'success','data':share})
}

async function createShare(req, res) {
    var data = req.body
    const share = await models.share.create({status:data.status,userId:req.user.id,postId:req.params.postId})
    res.json({'status':'success','message':'share created'});
}

module.exports = {
    getShare,
    createShare,
}          