const models = require('../models/index');
// const controller = require('../models/reaction');
async function getreaction(req,res){
    const reaction = await models.reaction.findAll();
    res.json(reaction);
}
async function createreaction(req,res){
    var data = req.body;
    console.log(req.body);
    const reaction = await models.reaction.create(req.body)
    res.json(reaction);
}
async function updatereaction(req,res){
    var data = req.body;
    const reaction = await models.reaction.update(req.body,{
  where:{
    reaction: false
  }
});
    res.json(reaction);
}
async function destroyreaction(req,res){
    var data = req.body;
    const reaction = await models.reaction.destroy({
        where: {
          reaction: false
        }
      });
      res.json(reaction);
}
module.exports = {
    getreaction,
    createreaction,
    updatereaction,
    destroyreaction,
}