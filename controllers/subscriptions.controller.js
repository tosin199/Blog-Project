const models = require('../models/index');
require('dotenv').config();
const helpers = require('../helpers/method');
async function createSubs(req,res){
  const sub = await models.sub.create(
    {
      userId:req.user.id
    }
  );
  res.json({'status':'success','message':'user subscribed'})
};
async function getSubscribers(req,res){
  const User = await models.user.findOne(
    {
      where:{id:req.user.id}
    }
  )
  if(User.isAdmin) {
    const Sub = await models.sub.findAndCountAll(
      {
        include:[
          {model:models.user},
          {model:models.categorySubscribed}
        ]
      }
    )
    res.json(Sub)
  }else{
    res.json({'status':'success','message':"you are not admin"});
  }
}
async function createCategorySub(req,res){
  const user = req.user
  const sub = await models.sub.findOne(
    {
      where:{userId:user.id}
    }
  );
  if(sub){
    const categorySub = await models.categorySubscribed.create(
      {
        subId:sub.id,
        categoryId:req.body.category
      }
    );
    return res.json({'status':'success','message':"category subscribed"});
  }
  return res.json({'status':'success','message':'user not subscribed'})
  
}
async function updateCategorySub(req,res){
  const categorySub = await models.categorySubscribed.update(
    {
      subId:req.params.id,
      categoryId:req.body.category
    }
  );
  res.json({'status':'success','message':"category subscribed"});
}
async function unsubscribe(req,res){
  const categorySub = await models.sub.destroy(
    {UseriId:req.user.id}
  );
  res.json({'status':'success','message':"category unsubscribed"});
}

async function deleteSubs(req,res){
  const sub = models.sub.destroy(
    {where:{id:req.user.id}}
  );
  res.json({'status':'success','message':'deleted'});

};
async function sendSubsMail(req,res){
  const user = req.user;
  const id  = user.id
  const subscription = await models.sub.findOne(
    {
      where:{userId:id}
    }
  );
  if(subscription){
    const categories = await models.categorySubscribed.findAll(
      {
        where:{subId:subscription.id}
      }
    );
    const posts = []
    for(let i=0;i<categories.length;i++){
      for(let j=0;j<process.env.LIMIT;j++){
        const impressions = await models.post.findOne(
          {
            where:{categoryId:categories[i].categoryId},
            attributes:['impressions']
          }
        );
        const post = await models.post.findOne(
          {
            where:{categoryId:categories[i].categoryId}
          }
        );
        if(impressions >= process.env.IMPRESSION){
          posts.push(post)
        }
      
      } 
    } 
    helpers.subscriptionEmail(user,posts);
    return res.json({'status':'success','message':'email sent'})
  }
  return res.json({'status':'success','message':'user not subscribed'})
}

module.exports = {
  getSubscribers,
  createSubs,
  createCategorySub,
  updateCategorySub,
  unsubscribe,
  deleteSubs,
  sendSubsMail
};
