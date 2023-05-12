const express=require('express');
const app = express();
const {getTopics}=require('./topicController.js');
const {getArticleById,getAllArticles}=require('./articleController.js');
const {getCommentsByArticleId}=require('./commentController.js');
const {getJson}=require('./jsonController.js');

app.get('/api/topics',getTopics);

app.get('/api',getJson);

app.get('/api/articles/:article_id',getArticleById);

app.get('/api/articles',getAllArticles);

app.get('/api/articles/:article_id/comments',getCommentsByArticleId);

app.use((err,req,res,next)=>{
    
    res.status(err.status).send({msg:err.msg})
})



module.exports = app;

