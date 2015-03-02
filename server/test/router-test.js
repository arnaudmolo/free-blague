import assert from 'assert';
import request from 'supertest';
import {should, expect} from 'chai';

import App from './../server';

import fakeTheDatas from './../create-test-data';

describe('Custom API', function(){

  describe('Radom joke', function(){

    it('respond with a random joke', function(done){
      request(App)
        .get('/api/Jokes/random?lang=fr')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('respond with a random joke with different languages', function(done){
      request(App)
        .get('/api/Jokes/random?lang=en')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res){
          expect(res.res.body.joke.language).to.equal('en');
          done();
        });
    });

    it('respond with a 404 when no joke of this language', function(done){
      request(App)
        .get('/api/Jokes/random?lang=zq')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('respond with a 400 when no language provided', function(done){
      request(App)
        .get('/api/Jokes/random')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

  });

  describe('Vote for a joke', function(){

    it('respond with a positiv vote registerd', function(done){

      request(App)
        .post('/api/jokes')
        .send({
          content: 'A test joke',
          date: new Date(),
          language: 'fr'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res){
          request(App)
            .get('/api/Jokes/vote?vote=true&jokeId=' + res.res.body.id)
            .set('Accept', 'application/json')
            .expect(200, function(err, res){
              if (err){
                console.error('an error !', err);
                return false;
              };
              expect(res.res.body.joke.positiv).to.equal(1);
              done();
            });
        });
    });

    it('respond with a negativ vote registerd', function(done){

      request(App)
        .post('/api/jokes')
        .send({
          content: 'A test joke',
          date: new Date(),
          language: 'fr'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res){
          request(App)
            .get('/api/Jokes/vote?vote=false&jokeId=' + res.res.body.id)
            .set('Accept', 'application/json')
            .expect(200, function(err, res){
              if (err){
                console.error('an error !', err);
                return false;
              };
              expect(res.res.body.joke.negativ).to.equal(1);
              done();
            });
        });

    });

    it('respond with an error', function(done){

      request(App)
        .get('/api/Jokes/vote?jokeId=6')
        .set('Accept', 'application/json')
        .expect(500, done);

    });
  });
});
