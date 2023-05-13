const db=require('../db/connection.js');
const format=require('pg-format');

exports.selectArticleById=(id)=>{
    if(typeof(JSON.parse(id))!='number'){
        
        return Promise.reject({status:400,msg:"Invalid article_id"});
    }
  
    const article_id=[id];

 
    return db
    .query(`SELECT title,article_id,topic,author,body
    ,created_at,votes,article_img_url
    FROM 
    articles
   
    WHERE article_id=$1;`,article_id)
    .then((result)=>{
        if(result.rows.length===0){
           return Promise.reject({status :404,msg:"article_id not found"})
        }
       
        return result.rows[0]
    })

}

exports.selectAllArticles=()=>{
  const  queryString=`SELECT A.article_id,A.title,A.topic,
  A.author,A.created_at,
  A.article_img_url
  ,COUNT(comment_id ) AS comment_count
, COUNT(comments.votes) AS votes 
   
   FROM articles A
  
   LEFT JOIN comments 
   ON comments.article_id=A.article_id

  GROUP BY A.article_id
   ORDER BY created_at DESC
  ;
  `
return db
.query(queryString)
.then((result)=>{
    const articlesArray=result.rows;
    return (articlesArray);
})
}

exports.updateArticleById =(voteObject,article_id)=>{
   

const newVotes=voteObject.inc_votes;


    
    return db
    .query(`
    UPDATE articles
    SET votes=votes+$1
    WHERE article_id=$2
    RETURNING *;`,[newVotes,article_id]
    )
    .then((result)=>{
       
       if(result.rows.length!==0){
        return result.rows[0];
       }else return Promise.reject({status:404,msg:'Article not found'})
    })
    .catch((err)=>{
        if(err.code==='22P02'){
            return Promise.reject({status:400,msg:"Invalid data type"})
        }
        else{
            return Promise.reject({status:err.status,msg:err.msg})
        }
        
    })


}






