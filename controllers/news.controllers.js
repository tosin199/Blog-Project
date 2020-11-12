
const models = require('../models/index');

async function getNews(req, res) {
    const news = await models.news.findAll();
    res.json(news);
}

async function createNews(req, res) {
    var data = req.body;
    const news = await models.news.create(data);
    res.json(news);
}

async function updateNews(req, res) {
    var data = req.body;
    var newsId = req.params.id;
    const news = await models.news.update({Name:data.Name, Description: data.Description},{where: {id:newsId}})
    res.json(news);
}

async function deleteNews (req, res) {
    var newsId = req.params.id;
    const news = await models.news.destroy({where:{id: newsId}})
    res.send('deleted')

}

module.exports = {
    getNews,
    createNews,
    updateNews,
    deleteNews,
};