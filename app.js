const express=require('express');
const app = express();
const {getTopics}=require('./topicController.js');
const {getArticleById,getAllArticles}=require('./articleController.js');
const {postCommentByArticleId}=require('./commentController.js');

const {getJson}=require('./jsonController.js');

app.get('/api/topics',getTopics);

app.get('/api',getJson);

app.get('/api/articles/:article_id',getArticleById);

app.get('/api/articles',getAllArticles);

app.post('/api/articles/:article_id/comments',postCommentByArticleId)






module.exports = app;

