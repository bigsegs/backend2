const db=require('./db/connection.js');
const format=require('pg-format');
exports.selectCommentsByArticleId=(article_id)=>{
   
    if(typeof(JSON.parse(article_id))!="number"){
       
        return Promise.reject({status:400,msg:"Invalid article Id"})
    }
    const queryString=format(`SELECT * FROM comments
    WHERE article_id=%L
    ORDER BY created_at DESC;
    `,[article_id]);
    return db
    .query(queryString)
    .then((result)=>{
        if(result.rows.length===0){
            return Promise
            

            .reject({status:200,msg:"No comments found for given Id"});
        }
        return result.rows;
    })
}

exports.selectCommentsByArticleId=(article_id)=>{

   

    if(typeof(JSON.parse(article_id))!="number"){
       

        return Promise.reject({status:400,msg:"Invalid article Id"})
    }

    const queryString=format(`SELECT * FROM comments
    WHERE article_id=%L
    ORDER BY created_at DESC;
    `,[article_id]);

    return db
    .query(queryString)
    .then((result)=>{
        if(result.rows.length===0){
            return Promise
            .reject({status:200,msg:"No comments found for given Id"});
        }
        return result.rows;
    })


}