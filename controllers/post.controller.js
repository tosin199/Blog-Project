const models = require('../models/index');

async function getPost(req, res) {
    const post = await models.post.findAll({include:[models.news]});
    res.json(post);
}

async function createPost(req, res) {
    newsId = req.params.id;
    var data = req.body;
    const post = await models.post.create({Title:data.Title,Body:data.Body,newsId:newsId});
    res.json(post);
}

async function updatePost(req, res) {
    var data = req.body;
    var postId = req.params.id;
    const post = await models.post.update({Title:data.Title, Content: data.Content},{where: {id:postId}})
    res.json(data);
}

async function deletePost (req, res) {
    var postId = req.params.id;
    const post = await models.post.destroy({where:{id: postId}})
    res.send('deleted')

}

module.exports = {
    getPost,
    createPost,
    updatePost,
    deletePost,
};
