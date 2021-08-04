const models = require('../models/index');

async function getCategory(req, res) {
    const category = await models.category.findAll({attributes:['id','name','description']});
    res.json(category);
}


async function createCategory(req, res) {
    var data = req.body;
    const user = await models.user.findOne({where:{id:req.user.id}});
    const checkCategory = await models.category.findOne({where:{name:data.name}});
    var message;
    if (user.isAdmin && !checkCategory){
        const category = await models.category.create(data);
         message = "Category created succesfully";
    } else if(!user.isAdmin){
        message = "you are not an admin"
    } else{
         message = "category already exist";
    }
    res.json({'status':'success','message':message})
}

async function updateCategory(req,res) {
    var data = req.body;
    var categoryId = req.params.id;
    const user = await models.user.findOne({where:{id:req.user.id}});
    if (user.isAdmin){
        const category = await models.category.update({name:data.name, description: data.description},{where: {id:categoryId}})
        res.json(category);
    } else{
        res.json({'status':'success','message':"you are not an admin"});
    }
    
}

async function deleteCategory (req, res) {
    var categoryId = req.params.id;
    const user = await models.user.findOne({where:{id:req.user.id}});
    if (user.isAdmin){
        const category = await models.category.destroy({where:{id: categoryId}})
        res.send({'status':'success','message':'deleted'})
    }
}

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};