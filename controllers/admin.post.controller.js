const models = require('../models/index');
const multer = require('multer');
const helpers = require('../config/helper')
const multerConfig = require('../config/multer');

async function adminGetPost(req,res){
  const user = await models.user.findOne({where:{id:req.user.id}});
  if (user.isAdmin){
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
    } else{
			res.json('you are not an admin')
		}
	
}
async function adminGetUnpublishedPost(req,res){
  const user = await models.user.findOne({where:{id:req.user.id}});
  if (user.isAdmin){
      let post = await models.post.findAndCountAll({where:{isPublished:false}});
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
    } else{
			res.json('you are not an admin')
		}
	
}
async function adminGetPosts(req,res){
	catId = req.params.id;
	const user = await models.user.findOne({where:{id:req.user.id}});
  if (user.isAdmin){
		let post = await models.post.findAndCountAll({where:{categoryId:catId}});
		let noOfPost = post.count;
		let pageLimit = parseInt(req.query.pageLimit);
		let currentPage = parseInt(req.query.currentPage);
		let pages = noOfPost/ pageLimit;
		let numberOfPages = Math.ceil(pages);
		let	skip = pageLimit * currentPage;
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
	} else{
		res.json('you are not an admin')
	}
}
async function adminGetUnpublishedPosts(req,res){
	catId = req.params.id;
	const user = await models.user.findOne({where:{id:req.user.id}});
  if (user.isAdmin){
		let post = await models.post.findAndCountAll({where:{categoryId:catId,isPublished:false}});
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
					where:{categoryId:catId,isPublished:false}
				})
				res.json({'msg':'there are '+ numberOfPages +' pages in this category','data':{
					'total':noOfPost,
					'pages':numberOfPages,
					'posts':posts
				}});
	} else{
		res.json('you are not an admin')
	}
}

async function createPost(req, res) {
	postId = req.params.postId
	const user = await models.user.findOne({where:{id:req.user.id}});
	if(user){
		multerConfig.multipleUpload(req, res, async function(err) {
			if (err instanceof multer.MulterError) {
				return res.json(err.message);
			} else if (err) {
					return res.json(err);
			} else if(!req.files && !req.file){
					res.json('No files picked')
			} else {
				const post = await models.post.create({title:req.body.title,body:req.body.body,author:user.firstname + user.lastname,categoryId:catId,userId:user.id,isPublished:true});
				for(var i= 0 ;i<=(req.files.length-1); i++){
					console.log(req.files[i])
					await models.postImage.create({image:req.files[i].path,postId:post.id})
				}	
					res.json({'msg':'uploaded','image':req.files})
				};
		})	
	} 
}

async function adminUpdatePost(req, res) {
    const data = req.body;
		const postId = req.params.id;
		const user = await models.user.findOne({where:{id:req.user.id}});
		if(user){
			const post = await models.post.update({title:data.title, body: data.body},{where:{id:postId,userId:user.id,isPublished:true}})
			res.json(post);
		} 
}
async function adminPublishPost(req, res) {
	const postId = req.params.id;
	const user = await models.user.findOne({where:{id:req.user.id}});
	if(user.isAdmin){
		const post = await models.post.update({isPublished:true},{where:{id:postId}})
		res.json(post);
	} 
}
async function adminUnpublishPost(req, res) {
	const postId = req.params.id;
	const user = await models.user.findOne({where:{id:req.user.id}});
	if(user.isAdmin){
		const post = await models.post.update({isPublished:false},{where:{id:postId}})
		res.json(post);
	} else{
		res.json('you are not an admin')
	}
}



	
module.exports = {
	adminGetPost,
	adminGetUnpublishedPost,
	adminGetUnpublishedPosts,
	createPost,
	adminGetPosts,
	adminUpdatePost,
	adminPublishPost,
	adminUnpublishPost
};
