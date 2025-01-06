import request from 'supertest';
import { expect } from 'chai';

const appUrl = 'https://pokeapi.co/api/v2';

describe('GET /', function () {
  it('should return links to API resources', async function () {
    const response = await request(appUrl)
      .get('/') 
      .expect(200);

    expect(response.body).to.be.an('object');
  });
});