const{selectArticleById,selectAllArticles,updateArticleById}=require('../models/articleModel.js');

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

exports.patchArticleById=(req,res,next)=>{
    const voteObject=req.body
    const id=req.params.article_id;
    updateArticleById(voteObject,id).then((result)=>{
        res.status(200).send({article:result})
    }).catch((err)=>{
        next(err)
    })
}