const request = require("supertest");
const app = require("../app.js");
const {topicData, userData, articleData, commentData }
 = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const connection = require("../db/connection.js");
const jsonfile=require('../endpoints.json')

beforeEach(() => {
  return seed({ topicData, userData, articleData, commentData });
});

afterAll(() => connection.end());

describe("GET /api/topics ", () => {
    test("should respond with status 200, 3 objects", () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
       .then((res) => {
           expect(res.body).toHaveProperty('topics');
           expect(res.body.topics.length).toBe(3);

           res.body.topics.forEach((topic)=>{
             expect(topic).toHaveProperty('slug');
             expect(topic).toHaveProperty('description');

           })

       });
    });
  });
  test("should respond with status 404", () => {
    return request(app)
      .get('/api/topic')
      .expect(404)

  });

  describe('GET /api',()=>{
    
    it(`should match the json file at endpoints.json`,()=>{
      return request(app)
      .get('/api')
      .expect(200)
      .then((result)=>{
      expect(result.body).toEqual(jsonfile);
        })
      })         
     
  })
  
  describe('GET /api/articles/:article_id',()=>{
    it('should return 200 and the correct article',()=>{
      return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((result)=>{
        const article=result.body.article;
        expect(article.article_id).toEqual(1);
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('body');
        expect(article).toHaveProperty('topic');
        expect(article).toHaveProperty('created_at');
        expect(article).toHaveProperty('votes');
        expect(article).toHaveProperty('article_img_url');
        expect(typeof (article.title)).toBe('string');
        expect(typeof (article.body)).toBe('string');
        expect(typeof (article.topic)).toBe('string');
        expect(typeof (article.votes)).toBe('number');
        expect(typeof (article.article_img_url)).toBe('string');
        expect(typeof (article.created_at)).toBe('string');
      })
    })

    it('should return 400 invalid id',()=>{
      return request(app)
      .get('/api/articles/"string"')
      .expect(400)
      .then((result)=>{
        expect(result.body.msg).toEqual('Invalid article_id');
      })
    })
    it('should return 404 article_id not found',()=>{
      return request(app)
      .get('/api/articles/9999')
      .expect(404)
      .then((result)=>{
        
        expect(result.body.msg).toEqual('article_id not found');
      })
    })
  
  
  })

  describe('GET /api/articles',()=>{
    it('should return an array on the key or articles',()=>{
      return request(app)
      .get('/api/articles')
      .expect(200)
      .then((result)=>{
        expect(result.body).toHaveProperty('articles');
        expect(Array.isArray(result.body.articles)).toBe(true);
        expect(result.body.articles.length).toBe(12)
        expect(result.body.articles)
        .toBeSortedBy("created_at",{descending:true});

        result.body.articles.forEach(article=>{
          expect(article).not.toHaveProperty('body');
          expect(article).toHaveProperty('author');
          expect(article).toHaveProperty('title');
          expect(article).toHaveProperty('article_id');
          expect(article).toHaveProperty('topic');
          expect(article).toHaveProperty('created_at');
          expect(article).toHaveProperty('votes');
          expect(article).toHaveProperty('article_img_url');
          expect(article).toHaveProperty('comment_count');
          expect(typeof(article.author)).toBe('string');
          expect(typeof(article.title)).toBe('string');
          expect(typeof(article.article_id)).toBe('number');
          expect(typeof(article.topic)).toBe('string');
          expect(typeof(article.created_at)).toBe('string');
          expect(typeof(article.votes)).toBe('string');
          expect(typeof(article.article_img_url)).toBe('string');
          expect(typeof(article.author)).toBe('string');

           });
       
        
        })
      })

    })

    describe('GET /api/articles/:article_id/comments',()=>{
          it('should return 400 Invalid Id for invalid Id',()=>{
      return request(app)
      .get('/api/articles/"foobar"/comments')
      .expect(400)
      .then((result)=>{
        expect(result.body.msg).toEqual("Invalid article Id")
      })
    })

    it('should return 200 with correct properties',()=>{
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then((result)=>{
        expect(result.body.comments).toBeSortedBy('created_at',{descending:true})
        expect(result.body.comments.length).toBe(11);
        result.body.comments.forEach((comment)=>{
        expect(comment).toHaveProperty('comment_id');
        expect(comment).toHaveProperty('votes');
        expect(comment).toHaveProperty('created_at');
        expect(comment).toHaveProperty('author');
        expect(comment).toHaveProperty('body');
        expect(comment).toHaveProperty('article_id');
        expect(typeof(comment.comment_id)).toBe('number');
        expect(typeof(comment.votes)).toBe('number');
        expect(typeof(comment.created_at)).toBe('string');
        expect(typeof(comment.author)).toBe('string');
        expect(typeof(comment.body)).toBe('string');
        expect(typeof(comment.article_id)).toBe('number');
        })
      
      })
    })
    it('should return 200 for no comments',()=>{
      return request(app)
      .get('/api/articles/4/comments')
      .expect(200)
      .then((result)=>{
        expect(result.body.msg).toEqual("No comments found for given Id")
      })
    })

    
  })

  describe('POST /api/articles/:article_id/comments',()=>{
    it('should return 201 with posted comment',()=>{
      return request(app)
      .post('/api/articles/1/comments')
      .expect(201)
      .send({"username":"lurker","body":"What a Terrible Failure"})
      .then((result)=>{
        const comment=result.body.posted_comment;
        expect(comment.article_id).toEqual(1);
        expect(comment.author).toEqual("lurker");
        expect(comment.body).toEqual("What a Terrible Failure");
        expect(comment.comment_id).toEqual(19);
        expect(typeof (comment.created_at)).toBe("string");
        expect(comment.votes).toEqual(0);
      })
    })
    it('should return 500 with Invalid data type',()=>{
      return request(app)
      .post('/api/articles/"foobar"/comments')
      .expect(500)
      .send({"username":"bob","body":"What a Terrible Failure"})
      .then((result)=>{
                expect(result.body.msg).toEqual("Invalid data type");
      })
    })
    it('should return 500 with User not found',()=>{
      return request(app)
      .post('/api/articles/1/comments')
      .expect(500)
      .send({"username":"bob","body":"What a Terrible Failure"})
      .then((result)=>{
                expect(result.body.msg).toEqual("User not found");
      })
    })
    it('should return 500 with User not found',()=>{
      return request(app)
      .post('/api/articles/1/comments')
      .expect(500)
      .send({"username":"bob","body":null})
      .then((result)=>{
                expect(result.body.msg).toEqual("Invalid data type");
      })
    })
  })
  describe('PATCH /api/articles/:article_id',()=>{
    it('should respond 200 with updated article',()=>{
      return request(app)
      .patch('/api/articles/1')
      .expect(200)
      .send({inc_votes:2})
      .then((result)=>{
       
        const article=result.body.article;
        expect(article.article_id).toBe(1);
        expect(article.votes).toBe(102);
        expect(article.title).toBe('Living in the shadow of a great man')
        expect(article.topic).toBe('mitch');
        expect(article.author).toBe('butter_bridge');
        expect(article.body).toBe('I find this existence challenging');
        expect(article.created_at).toBe('2020-07-09T20:11:00.000Z');
        expect(article.article_img_url).toBe(`https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700`)
      })

    })

      it('should respond 200 votes to be -2',()=>{
        return request(app)
        .patch('/api/articles/1')
        .expect(200)
        .send({inc_votes:-102})
        .then((result)=>{
          const article=result.body.article;
          expect(article.votes).toBe(-2);

        })
      })
      it('should respond with 400 and invalid data type',()=>{
        return request(app)
        .patch('/api/articles/1')
        .expect(400)
        .send({inc_votes:';DROP TABLE articles; --'})
        .then((result)=>{
        expect(result.body.msg).toEqual("Invalid data type")
        })

      })
      it('should respond with 404 and Article not found',()=>{
        return request(app)
        .patch('/api/articles/9999')
        .expect(404)
        .send({inc_votes:1})
        .then((result)=>{
        expect(result.body.msg).toEqual("Article not found")
        })

      })
      it('should respond with 400 and invalid data type',()=>{
        return request(app)
        .patch('/api/articles/;DROP TABLE articles; --')
        .expect(400)
        .send({inc_votes:1})
        .then((result)=>{
        expect(result.body.msg).toEqual("Invalid data type")
        })
      })
      
  })

  describe('DELETE /api/comments/:comment_id',()=>{
    it('should return 204, no content',()=>{
      return request(app)
      .delete('/api/comments/2')
      .expect(204)
      .then((result)=>{
        expect(result.body).toEqual({});
      })
    })
    it('should return 404, comment not found',()=>{
      return request(app)
      .delete('/api/comments/9999')
      .expect(404)
      .then((result)=>{
        
        expect(result.body.msg).toEqual("Comment not found");
      })
    })
    it('should return 400, Invalid data type',()=>{
      return request(app)
      .delete('/api/comments/comment2')
      .expect(400)
      .then((result)=>{
        expect(result.body.msg).toEqual("Invalid data type");
      })
    })
  })

  describe('GET api/users',()=>{
    it('return an array on key of users',()=>{
      return request(app)
      .get('/api/users')
      .expect(200)
      .then((result)=>{
        const userArray=result.body.users;
        expect(Array.isArray(result.body.users)).toBe(true);
        expect(result.body.users.length).toBe(4)
        userArray.forEach(user=>{
          expect(user).toHaveProperty('username');
          expect(user).toHaveProperty('name')
          expect(user).toHaveProperty('avatar_url')
        })
      })
    })
  })

 
