const db=require('./db/connection.js');
const format=require('pg-format');

exports.selectArticleById=(id)=>{
    if(typeof(JSON.parse(id))!='number'){
        
        return Promise.reject({status:400,msg:"Invalid article_id"});
    }
  
    const article_id=[id];

 
    return db
    .query(`SELECT title,article_id,topic,A.author,body
    ,created_at,votes,
     B.avatar_url AS article_img_url
     FROM articles A
     JOIN users B
     ON A.author=B.username
    WHERE article_id=$1;`,article_id)
    .then((result)=>{
        if(result.rows.length===0){
           return Promise.reject({status :404,msg:"article_id not found"})
        }
       
        return result.rows[0]
    })

}

exports.selectAllArticles=()=>{
  const  queryString=`SELECT article_id,title,topic,A.author,
  created_at,votes,
   U.avatar_url AS article_img_url
   
   FROM articles A
   JOIN users U
   ON A.author=U.username
   ORDER BY created_at DESC
  ;
  `
  const article_id=1;
  

return db
.query(queryString)
.then((result)=>{

    const articlesArray=result.rows;

git
    for(let i=0;i<articlesArray.length;i++){

        const article_id=articlesArray[i].article_id
        const commentQuery=format(`SELECT * FROM comments
    WHERE article_id=%L`,article_id);
    
        const cc= db
        .query(commentQuery)
        .then((result)=>{
            const comment_count=result.rows.length;
           return comment_count
        });

        articlesArray[i].comment_count=cc;
    }
   console.log("result in model before return", articlesArray)
    return articlesArray;
})

}








