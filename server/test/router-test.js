import assert from 'assert';
import request from 'supertest';
import {should, expect} from 'chai';

import App from './../server';

describe('Custom API', function(){

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
      .expect(200, function(err, res) {
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
