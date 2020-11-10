const models = require('../models/index');

async function getShare(req, res) {
    var data = req.body;
    const share = await models.news.findAll();
    res.json(share);
}

async function createShare(treq, res) {
    var data = req.body;
    var shareId = await models.share.create(data);
    res.json(share);
}

module.exports = {
    getShare,
    createShare
}