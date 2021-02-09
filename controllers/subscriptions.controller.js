const models = require('../models/index');
require('dotenv').config();
const helpers = require('../helpers/method');
async function createSubs(req,res){
  const sub = await models.sub.create(
    {
      userId:req.user.id
    }
  );
  res.json({'message':'user subscribed','status':'success',})
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
    res.json("you are not admin");
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
    return res.json("category subscribed");
  }
  return res.json('user not subscribed')
  
}
async function updateCategorySub(req,res){
  const categorySub = await models.categorySubscribed.update(
    {
      subId:req.params.id,
      categoryId:req.body.category
    }
  );
  res.json("category subscribed");
}
async function unsubscribe(req,res){
  const categorySub = await models.sub.destroy(
    {UseriId:req.user.id}
  );
  res.json("category unsubscribed");
}

async function deleteSubs(req,res){
  const sub = models.sub.destroy(
    {where:{id:req.user.id}}
  );
  res.send('deleted');

};
async function sendSubsMail(req,res){
  const user = req.user;
  const subscription = await models.sub.findOne(
    {
      where:{userId:user.id}
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
      const post = await models.post.findOne(
        {
          where:{categoryId:categories[i].categoryId}
        }
      );
      // if(post.impressions>=process.env.IMPRESSION){
      //   posts.push(post)
      // } 
      console.log(post);
    } 
    sendSubsMail(user,posts);
    return res.json(user)
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
