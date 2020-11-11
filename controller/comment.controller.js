const models = require('../models/index');


async function getComment(req,res){
    const comment = await models.comment.findAll();
    res.json(comment);
}

async function createComment(req,res){
    var data = req.body;
    console.log(req.body);
    const comment = await models.comment.create(data);
    res.json(comment);
}

async function updateComment(req,res){
    var commentId = req.params.id;
    var data = req.body;
    const comment = await models.comment.update({content: data.content}, {where: {id: commentId}})
    res.json(data);
}

async function destroyComment(req,res){
    var commentId = req.params.id;
    var data = req.body;
    const comment = await models.comment.destroy({
        where: {
          id: commentId
        }
    });
    res.send('deleted');
}


module.exports = {
    getComment,
    createComment,
    updateComment,
    destroyComment,
};