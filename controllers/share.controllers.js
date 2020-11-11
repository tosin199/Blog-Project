const models = require('../models/index');

async function getShare(req, res) {
    var data = req.body;
    const share = await models.share.findAll();
    res.json(share);
}

async function createShare(req, res) {
    var data = req.body;
    const share = await models.share.create(data);
    res.json(share);
}

module.exports = {
    getShare,
    createShare
}          