const models = require('../models/index');

async function getSub(req,res){
  const sub = await models.sub.findAll({include:[models.user]});
  res.json(sub);

};

async function createSubs(req,res){
  data = req.params.id;
  const sub = await models.sub.create({userId:data});
  res.json(sub)
};

async function deleteSubs(req,res){
  userId = req.params.id;
  const sub = models.sub.destroy({where:{id:userId}});
  res.send('deleted');

};

module.exports = {
  getSub,
  createSubs,
  deleteSubs
};
