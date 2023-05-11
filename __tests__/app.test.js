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
        expect(result.body.article.article_id).toEqual(1);
        expect(result.body.article).toHaveProperty('title');
        expect(result.body.article).toHaveProperty('body');
        expect(result.body.article).toHaveProperty('topic');
        expect(result.body.article).toHaveProperty('created_at');
        expect(result.body.article).toHaveProperty('votes');
        expect(result.body.article).toHaveProperty('article_img_url');
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
        expect(result.body.articles).toBeSortedBy("created_at",{descending:true});

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
           });
       
        
        })
    });

    
  })

  // describe('GET /api/articles/:article_id/comments',()=>{
  //   it('should return 400 Invalid Id for invalid Id',()=>{
  //     return request(app)
  //     .get('/api/articles/foobar/comments')
  //     .expect(400)
  //     .then((result)=>{
  //       expect(result.body.msg).toEqual("Invalid article Id")
  //     })
  //   })
  // })
 
