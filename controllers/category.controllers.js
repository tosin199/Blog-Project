const models = require('../models/index');

async function getCategory(req, res) {
    const category = await models.category.findAll({attributes:['name','description']});
    res.json(category);
}


async function createCategory(req, res) {
    var data = req.body;
    const user = await models.user.findOne({where:{id:req.user.id}});
    const checkCategory = await models.category.findOne({where:{name:data.name}});
    var msg;
    if (user.isAdmin && !checkCategory){
        const category = await models.category.create(data);
         msg = "Category created succesfully";
    } else if(!user.isAdmin){
        msg = "you are not an admin"
    } else{
         msg = "category already exist";
    }
    res.json(msg)
}

async function updateCategory(req,res) {
    var data = req.body;
    var categoryId = req.params.id;
    const user = await models.user.findOne({where:{id:req.user.id}});
    if (user.isAdmin){
        const category = await models.category.update({name:data.name, description: data.description},{where: {id:categoryId}})
        res.json(category);
    }
    
}

async function deleteCategory (req, res) {
    var categoryId = req.params.id;
    const user = await models.user.findOne({where:{id:req.user.id}});
    if (user.isAdmin){
        const category = await models.category.destroy({where:{id: categoryId}})
        res.send('deleted')
    }
}

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};