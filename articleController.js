const{selectArticleById,selectAllArticles}=require('./articleModel.js');

exports.getArticleById=(req,res,next)=>{
const id=req.params.article_id;
selectArticleById(id).then((result)=>{
    res.status(200).send({article:result})
}).catch((err)=>{
    
    res.status(err.status).send({msg:err.msg})
})

}

exports.getAllArticles=(req,res,next)=>{
    selectAllArticles().then((result)=>{
        res.status(200).send({articles:result})
    })
};