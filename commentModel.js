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

exports.insertCommentById=(comment,article_id)=>{
const author=comment.username;
const body=comment.body;
const votes=0;
const created_at=Date.now();
const values=[[body],[votes],[author],[article_id],[created_at]]
    const queryString=format(`
    INSERT INTO comments
    (body,votes,author,article_id,created_at)
    VALUES
    %L
    RETURNING *;`,values);

    return db
    .query(queryString)
    .then((result)=>{
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