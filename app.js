const express=require('express');
const app = express();
const {getTopics}=require('./controllers/topicController.js');
const {getArticleById,getAllArticles,patchArticleById}=require('./controllers/articleController.js');
const {getCommentsByArticleId,postCommentByArticleId,deleteCommentByCommentId}=require('./controllers/commentController.js');
const {getJson}=require('./controllers/jsonController.js');

app.use(express.json());

app.get('/api/topics',getTopics);

app.get('/api',getJson);

app.get('/api/articles/:article_id',getArticleById);

app.get('/api/articles',getAllArticles);

app.post('/api/articles/:article_id/comments',postCommentByArticleId)

app.get('/api/articles/:article_id/comments',getCommentsByArticleId)

app.patch('/api/articles/:article_id',patchArticleById)

app.delete('/api/comments/:comment_id',deleteCommentByCommentId)


app.use((err,req,res,next)=>{
  // console.log(err)
    res.status(err.status).send({msg:err.msg})
})


module.exports = app;

