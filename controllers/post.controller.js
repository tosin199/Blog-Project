const models = require('../models/index');

async function getPost(req, res) {
    const post = await models.news.findAll();
    res.json(post);
}

async function createPost(req, res) {
    var data = req.body;
    const post = await models.post.create(data);
    res.json(post);
}

async function updatePost(req, res) {
    var data = req.body;
    var postId = req.params.id;
    const post = await models.news.update({Title:data.Title, Content: data.Content},{where: {id:postId}})
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