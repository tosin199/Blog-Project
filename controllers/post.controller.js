const models = require('../models/index');
const multer = require('multer');
const helpers = require('../config/helper')
const multerConfig = require('../config/multer');

async function getPost(req,res){
	let post = await models.post.findAndCountAll();
	let noOfPost = post.count;
	let pageLimit = parseInt(req.query.pageLimit);
	
	let currentPage = parseInt(req.query.currentPage);
	let pages = noOfPost / pageLimit;
	let numberOfPages = Math.ceil(pages);
  
	let	skip = currentPage * pageLimit
			const posts = await models.post.findAll(
			{
				include:[{model:models.category},{model:models.postImage},{model:models.comment}],
				order:[['updatedAt','DESC']],
				offset:skip,limit:pageLimit
			})
	res.json({'msg':'there are '+ numberOfPages +' pages','data':{
		'total':noOfPost,
		'pages':numberOfPages,
		'posts':posts
	}});
}
async function getPosts(req,res){
  catId = req.params.id;
	let post = await models.post.findAndCountAll({where:{categoryId:catId}});
	let noOfPost = post.count;
	let pageLimit = parseInt(req.query.pageLimit);
	let currentPage = parseInt(req.query.currentPage);
	let pages = noOfPost/ pageLimit;
	let numberOfPages = Math.ceil(pages);
	let	skip = pageLimit * currentPage;
		lim = 3
		const posts = await models.post.findAll(
			{
				include:[{model:models.category},{model:models.postImage},{model:models.comment}],
				order:[['updatedAt','DESC']],
				offset:skip,limit:pageLimit,
				where:{categoryId:catId}
			})
			res.json({'msg':'there are '+ numberOfPages +' pages in this category','data':{
				'total':noOfPost,
				'pages':numberOfPages,
				'posts':posts
			}});
}

async function createPostText(req,res){
	catId = req.params.id;
	const user = await models.user.findOne({where:{id:req.user.id}});
	if(user.isAdmin){
		await models.post.create({title:req.body.title,body:req.body.body,categoryId:catId});
  	return  res.json({'msg': 'post uploaded', "body":req.body});
	}
	
}

async function createPostImages(req, res) {
	postId = req.params.postId
	const user = await models.user.findOne({where:{id:req.user.id}});
	if(user.isAdmin){
		multerConfig.multipleUpload(req, res, async function(err) {
			if (err instanceof multer.MulterError) {
				return res.json(err.message);
			} else if (err) {
					return res.json(err);
			} else if(!req.files && !req.file){
					res.json('No files picked')
			} else if(req.file) {
				console.log('inpoint')
					await models.postImage.create({image:req.file.path,postId:postId})
					return  res.json({'msg': 'post created','file':req.file,"body":req.body});
			} else {
				console.log(req.files);
				for(var i= 0 ;i<=(req.files.length-1); i++){
					console.log(req.files[i])
					await models.postImage.create({image:req.files[i].path,postId:postId})
				}	
					res.json({'msg':'uploaded','image':req.files})
				};
		})	
	} else{ 
		res.json('you are not an admin')
	}
}

async function updatePost(req, res) {
    const data = req.body;
		const postId = req.params.id;
		const user = await models.user.findOne({where:{id:req.user.id}});
		if(user.isAdmin){
			const post = await models.post.update({title:data.title, body: data.body},{where: {id:postId}})
			res.json(post);
		} else{
			res.json('you are not an admin');
		}
	}
async function updatePostImages(req,res){
	postId = req.params.postId
	const user = await models.user.findOne({where:{id:req.user.id}});
	if(user.isAmin){
		multerConfig.multipleUpload(req, res, async function(err) {
			if (err instanceof multer.MulterError) {
				return res.json(err.message);
			} else if (err) {
					return res.json(err);
			} else if(!req.files && !req.file){
					res.json('No files picked')
			} else if(req.file) {
					await models.postImage.update({image:req.file.path,postId:postId})
					return  res.json({'msg': 'post created','file':req.files,"body":req.body});
			} else {
					for(var i= 0;i<=(req.files.length-1); i++){
						await models.postImage.update(
							{
							image:req.files[i].path,
							postId:postId
							}, 	let
						)
					}	
				};
		})
	} else{
		res.json('you are not an admin');
	}
}

async function deletePost(req, res) {
		const postId = req.params.id;
		const user = await models.user.findOne({where:{id:req.user.id}});
		if(user.isAdmin){
			const post = await models.post.destroy({where:{id: postId}})
			res.send('deleted')
	}else{
		res.json('you are not an admin')
	}
}


module.exports = {
    getPost,
		getPosts,
		createPostText,
    createPostImages,
    updatePost,
		deletePost,
		updatePostImages,
};
