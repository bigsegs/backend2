
You will need two files adding at root directory level..
.env.test
constaining PGDATABASE=nc_news_test

and another file
.env.developement
containing PGDATABASE=nc_news
 
and if youre hosting...
.env.production
containing e.g. DATABASE_URL=postgres://..url of your database