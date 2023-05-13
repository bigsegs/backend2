const express=require('express');
const app = express();
const {getTopics}=require('./topicController.js');
const {getArticleById,getAllArticles,patchArticleById}=require('./articleController.js');
const {getCommentsByArticleId,postCommentByArticleId}=require('./commentController.js');
const {getJson}=require('./jsonController.js');

app.use(express.json());

app.get('/api/topics',getTopics);

app.get('/api',getJson);

app.get('/api/articles/:article_id',getArticleById);

app.get('/api/articles',getAllArticles);

app.post('/api/articles/:article_id/comments',postCommentByArticleId)

app.get('/api/articles/:article_id/comments',getCommentsByArticleId)

app.patch('/api/articles/:article_id',patchArticleById)


app.use((err,req,res,next)=>{
  // console.log(err)
    res.status(err.status).send({msg:err.msg})
})


module.exports = app;

