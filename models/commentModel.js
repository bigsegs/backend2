const db=require('../db/connection.js');
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

exports.insertCommentById=(comment,article_id)=>{
    const author=comment.username;
    const body=comment.body;
   
    
    const values=[[body,author,article_id]]
        const queryString=format(`
        INSERT INTO comments
        (body,author,article_id)
        VALUES
        %L
        RETURNING *;`,values);
       
    
        return db
        .query(queryString)
        .then((result)=>{
          
            return result.rows[0];
        }).catch((err)=>{

            if (err.code==="23503"){
                return Promise.reject({status:500,msg:"User not found"})
            }else if(err.code="22P02"){
                return Promise.reject({status:500,msg:"Invalid data type"})
            }
            
            
        })
    }

    exports.deleteCommentById=(id)=>{
        const queryString=format(`
        DELETE FROM comments
        WHERE comment_id=%L
        RETURNING *;`,[[id]]);

        return db
        .query(queryString)
        .then((result)=>{
            if(result.rows.length!==0){
            return result.rows;
            }else return Promise.reject({status:404,msg:"Comment not found"})
        })
        .catch((err=>{
            return Promise.reject({status:err.status,msg:err.msg})
        }))
    }
    
    