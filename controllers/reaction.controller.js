const models = require('../models/index');
// const controller = require('../models/reaction');
async function getreaction(req,res){
    const reaction = await models.reaction.findAll({include:[models.user]});
    res.json(reaction);
}
async function getOneReaction(req,res){
    const reaction = await models.reaction.findAll({where:{postId:req.params.id}},{include:[models.user]});
    res.json(reaction);    
}
async function createreaction(req,res){
    var data = req.body
    const reaction = await models.reaction.create({reaction:data.reaction,userId:req.params.userId,postId:req.params.postId},{where:{reaction:false}})
    res.json(reaction);
}
async function updatereaction(req,res){
    var Id= req.params.id;
    var data = req.body;
    const reaction = await models.reaction.update({reaction:data.reaction,userId:req.params.userId,postId:req.params.postId},{where: {id:Id}});
    res.json(reaction);
}
async function destroyreaction(req,res){
    var userId = req.params.id
    var data = req.body;
    const reaction = await models.reaction.destroy({where: {id:userId}});
      res.json(reaction);
}
module.exports = {
    getreaction,
    createreaction,
    updatereaction,
    destroyreaction,
    getOneReaction
}