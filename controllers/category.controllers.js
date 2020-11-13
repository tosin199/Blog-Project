
const { post } = require('../models/index');
const models = require('../models/index');

async function getCategory(req, res) {
    const category = await models.category.findAll();
    res.json(category);
}


async function createCategory(req, res) {
    var data = req.body;
    const checkCategory = await models.category.findOne({where:{name:data.name}});
    if (checkCategory){
       var msg = "category already exist";
    } else{
        const category = await models.category.create(data);
        var msg = "Category created succesfully";
    }
    res.json(msg);
}

async function updateCategory(req,res) {
    var data = req.body;
    var categoryId = req.params.id;
    const category = await models.category.update({name:data.name, description: data.description},{where: {id:categoryId}})
    res.json(category);
}

async function deleteCategory (req, res) {
    var categoryId = req.params.id;
    const category = await models.category.destroy({where:{id: categoryId}})
    res.send('deleted')

}

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};