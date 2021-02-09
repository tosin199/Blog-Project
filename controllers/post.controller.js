const models = require('../models/index');
const multer = require('multer');
const helpers = require('../config/helper')
const multerConfig = require('../config/multer');

async function getPost(req,res){
	let post = await models.post.findAndCountAll({where:{isPublished:true}});
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
				offset:skip,limit:pageLimit,
				where:{isPublished:true}
			})
	res.json({'status':'success','message':'there are '+ numberOfPages +' pages','data':{
		'total':noOfPost,
		'pages':numberOfPages,
		'posts':posts
	}});
}
async function getAPost(req,res){
	postId = req.query.id
	const post = await models.post.findOne({where:{id:req.params.id},include:[{model:models.category},{model:models.postImage},{model:models.comment}]});
	res.json({'status':'success','data':post});
}
async function getPosts(req,res){
  catId = req.params.id;
	let post = await models.post.findAndCountAll({where:{categoryId:catId,isPublished:true}});
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
				where:{categoryId:catId,isPublished:true}
			})
			res.json({'status':'success','message':'there are '+ numberOfPages +' pages in this category','data':{
				'total':noOfPost,
				'pages':numberOfPages,
				'posts':posts
			}});
}


async function createPost(req, res) {
	catId = req.params.id
	const user = await models.user.findOne({where:{id:req.user.id}});
	if(user){
		multerConfig.multipleUpload(req, res, async function(err) {
			if (err instanceof multer.MulterError) {
				return res.json(err.message);
			} else if (err) {
					return res.json(err);
			} else if(!req.files && !req.file){
					res.json({'status':'success','message':'No files picked'})
			} else {
				if(user.firstname,user.bio){
					const post = await models.post.create({title:req.body.title,body:req.body.body,author:user.firstname + user.lastname,categoryId:catId,userId:user.id,isPublished:true});
					for(var i= 0 ;i<=(req.files.length-1); i++){
						await  models.postImage.create({image:req.files[i].path,postId:post.id})
					}	
						return res.json({'status':'success','message':'uploaded','data':post});
				}
				return res.json({'status':'success','message':'account not complete'});
				
			};
		})	
	} 
}


async function updatePost(req,res){
	postId = req.params.postId
	const user = await models.user.findOne({where:{id:req.user.id}});
	if(user){
		multerConfig.multipleUpload(req, res, async function(err) {
			if (err instanceof multer.MulterError) {
				return res.json(err.message);
			} else if (err) {
					return res.json(err);
			} else if(!req.files && !req.file){
					res.json({'status':'success','message':'No files picked'})
			} else {
				const post = await models.post.update(
					{
						title:req.body.title
						,body:req.body.body,
						author:user.firstname + user.lastname,
						categoryId:catId,userId:user.id
					},
					{
						where:{postId:postId}
					}
					);
					for(var i= 0;i<=(req.files.length-1); i++){
						await models.postImage.update(
							{
							image:req.files[i].path,
							postId:postId
							},{
								where:{postId:postId}
							}
						)
					}
					res.json({'status':'success','message':'updated','image':post})	
			};
		})
	} 
}

async function deletePost(req, res) {
		const postId = req.params.id;
		const user = await models.user.findOne({where:{id:req.user.id}});
		if(user){
			const post = await models.post.destroy({where:{id:postId,userId:user.id}})
			res.send({'status':'success','message':'deleted'})
	}
}
async function createImpression(req,res){
  const id = req.params.id
  const post = await models.post.findOne(
    {
      where:{id:id}
    }
	)
	let impression;
	if(post.impressions){
		impression = parseFloat(post.impressions);
		impression +=1;
	} else{
		impression = 1;
	}
  await models.post.update(
   {
     impressions:impression
   },
   {
     where:{id:id}
   }
	)
  res.json({'status':'success','message':'impression created'});
}
async function getImpression(req,res){
  const id = req.params.id
  const impression = await models.post.findOne(
    {
      where:{id:id},
      attributes:['impressions']
    }
  )
  res.json({'status':'success','data':impression});
}

module.exports = {
		getPost,
		getAPost,
		getPosts,
		createPost,
    updatePost,
		deletePost,
		updatePost,
		createImpression,
		getImpression
};
