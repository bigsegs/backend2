const db=require('./db/connection.js');

exports.selectCommentsByArticleId=(article_id)=>{

    if(typeof(JSON.parse(article_id))!="number"){
        return Promise.reject({status:400,msg:"Invalid article Id"})
    }
    return([anything])

}