const {selectCommentsByArticleId}=require('./commentModel');

exports.getCommentsByArticleId=(req,res,next)=>{
    

const article_id=req.params.article_id;

selectCommentsByArticleId(article_id).then((result)=>{
    
    res.status(200).send({comments:result})
})
.catch((err)=>{
   
res.status(err.status).send({msg:err.msg})
})


}