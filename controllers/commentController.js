
const {selectCommentsByArticleId,insertCommentById,deleteCommentById}=require('../models/commentModel');

exports.getCommentsByArticleId=(req,res,next)=>{
    

const article_id=req.params.article_id;

selectCommentsByArticleId(article_id).then((result)=>{
   
    res.status(200).send({comments:result})
})
.catch((err)=>{
    next(err)
})



}

exports.postCommentByArticleId=(req,res,next)=>{
const comment=req.body;
const article_id=req.params.article_id;



    insertCommentById(comment,article_id).then((result)=>{
        res.status(201).send({posted_comment:result})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.deleteCommentByCommentId=(req,res,next)=>{
const id=req.params.comment_id;

 deleteCommentById(id).then(()=>{
    res.status(204).send();

})
.catch((err)=>{
    next(err)
})

}