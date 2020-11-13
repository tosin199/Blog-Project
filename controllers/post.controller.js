const models = require('../models/index');

async function getPost(req, res) {
    const post = await models.post.findAll({include:[models.news]});
    res.json(post);
}
async function getPosts(req,res){
    newsId = req.params.id;
    const posts = await models.post.findAndCountAll({where:{newsId:newsId}})
    res.json(posts)

}

async function createPost(req, res) {
    newsId = req.params.id;
    var data = req.body;
    const post = await models.post.create({title:data.title,body:data.body,newsId:newsId});
    res.json(post);
}

async function updatePost(req, res) {
    var data = req.body;
    var postId = req.params.id;
    const post = await models.post.update({title:data.title, content: data.content},{where: {id:postId}})
    res.json(data);
}

async function deletePost (req, res) {
    var postId = req.params.id;
    const post = await models.post.destroy({where:{id: postId}})
    res.send('deleted')

}

module.exports = {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost,
};
