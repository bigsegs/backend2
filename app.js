const express=require('express');
const app = express();
const {getTopics}=require('./controllers/topicController.js');
const {getArticleById,getAllArticles,patchArticleById}=require('./controllers/articleController.js');
const {getCommentsByArticleId,postCommentByArticleId,deleteCommentByCommentId}=require('./controllers/commentController.js');
const {getJson}=require('./controllers/jsonController.js');
const {getAllUsers}=require('./controllers/userController.js')

app.use(express.json());

app.get('/api/topics',getTopics);

app.get('/api',getJson);

app.get('/api/articles/:article_id',getArticleById);

app.get('/api/articles',getAllArticles);

app.post('/api/articles/:article_id/comments',postCommentByArticleId)

app.get('/api/articles/:article_id/comments',getCommentsByArticleId)

app.patch('/api/articles/:article_id',patchArticleById)

app.delete('/api/comments/:comment_id',deleteCommentByCommentId)

app.get('/api/users',getAllUsers)


app.use((err,req,res,next)=>{
 // console.log(err)
  if(err.status===500  && !err.msg){
    res.status(500).send({msg:"What a Terrible Failure"})
  }
    res.status(err.status).send({msg:err.msg})
})


module.exports = app;

