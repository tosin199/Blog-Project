const models = require('../models/index');


async function createSubs(req,res){
  const sub = await models.sub.create({userId:req.user.id});
  res.json(sub)
};
async function getSubscribers(req,res){
  const User = await models.user.findOne({where:{id:req.user.id}})
  if(User.isAdmin) {
    const Sub = await models.sub.findAndCountAll({include:[{model:models.user},{model:models.categorySubscribed}]})
    res.json(Sub)
  }else{
    res.json("you are not admin");
  }
}
async function createCategorySub(req,res){
  const categorySub = await models.categorySubscribed.create({subId:req.params.id,categoryId:req.body.category});
  res.json("category subscribed");
}
async function updateCategorySub(req,res){
  const categorySub = await models.categorySubscribed.update({subId:req.params.id,categoryId:req.body.category});
  res.json("category subscribed");
}
async function unsubscribe(req,res){
  const categorySub = await models.sub.destroy({UseriId:req.user.id});
  res.json("category unsubscribed");
}




async function deleteSubs(req,res){
  const sub = models.sub.destroy({where:{id:req.user.id}});
  res.send('deleted');

};

module.exports = {
  getSubscribers,
  createSubs,
  createCategorySub,
  updateCategorySub,
  unsubscribe,
  deleteSubs
};
