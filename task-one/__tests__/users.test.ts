const request = require('supertest');
const { app } = require('../lib/app');
const fs = require('fs');


describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

describe('Post Endpoints', () => {
  it('should create a new post', done => {
    const res = request(app)
      .get('/')
      .send({
        "userId": "d55fae35-cde9-413b-8c89-e95bb4c81001",
        "organization": ".Net",
        "createdAt": "2020-08-12T19:04:55.455Z",
        "updatedAt": "2022-03-27T09:29:33.969Z",
        "products": [
          "developers"
        ],
        "marketValue": "90%",
        "address": "sangotedo",
        "ceo": "cn",
        "country": "Nigeria",
        "noOfEmployees": 2,
        "employees": [
          "james bond",
          "jackie chan"
        ]
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('get')
  })
})


describe('POST /api/', () => {
  it('respond Post with 200', (done) => {
    request(app).post("/users").expect(200, done)
    // done();
  })
})

describe('/GET details', () => {
  it('it should Get all details', done => {
  request(app)
  .get('/users').expect(200, done)
  });
});

describe('/Get individual detail', () => {
  it('it should Get individual details', done => {
    request(app).get('/users/:id').expect(200, done)
  });
});

describe('/Update individual detail', () => {
  it('it should Update the detail', done => {
    request(app).put('/users/:id').expect(200, done)
  });
});

describe('/Delete detail', () => {
  it('it should Delete all the detail', done => {
    request(app).delete('/users/:id').expect(200, done)
  });
});