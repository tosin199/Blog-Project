const { where } = require('sequelize/types');
const models = require('../models/index');

async function getSub(req,res){
  const sub = await models.sub.findall();
  res.json(sub);

};

async function createSubs(req,res){
  data = req.body;
  const sub = await models.sub.create({userId:data.id});
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
