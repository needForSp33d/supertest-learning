import request from 'supertest';
import { expect } from 'chai';

const baseUrl = 'https://pokeapi.co/api/v2';

describe('PokeAPI Resource List and Pagination Tests', function () {

  it('should return a paginated list of Pokemon', async function () {

//    console.log('Request: GET /pokemon?limit=20&offset=0');
    
    const response = await request(baseUrl)
      .get('/pokemon?limit=20&offset=5')
      .expect(200);  // Status code 200 for success

    console.log('Response:', JSON.stringify(response.body, null, 2));

    // Assert response body structure
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.all.keys('count', 'next', 'previous', 'results');

    // Validate count
    expect(response.body.count).to.be.a('number');

    // Check next and previous are either null or strings
    if (response.body.next !== null) {
      expect(response.body.next).to.be.a('string');
    }
    if (response.body.previous !== null) {
    expect(response.body.previous).to.be.a('string');
    }

    // Assert results is an array
    expect(response.body.results).to.be.an('array').with.lengthOf(20);

    // Assert each result item has name and url properties
    response.body.results.forEach(item => {
      expect(item).to.be.an('object').with.keys('name', 'url');
      expect(item.name).to.be.a('string');
      expect(item.url).to.be.a('string').and.satisfy(url => url.startsWith('https://'));
    });
  });

  it('should return a specific Pokemon detail', async function () {
    const response = await request(baseUrl)
      .get('/pokemon/ditto')
      .expect(200);  // Status code 200 for success

    // Assert response body structure
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('name', 'ditto');
    expect(response.body).to.have.property('id').that.is.a('number');
    expect(response.body).to.have.property('abilities').that.is.an('array');
    expect(response.body.abilities[0]).to.have.property('ability').that.is.an('object');
    expect(response.body.abilities[0].ability).to.have.property('name').that.is.a('string');
    expect(response.body.abilities[0].ability).to.have.property('url').that.is.a('string');
  });

  it('should return a list of abilities', async function () {
    const response = await request(baseUrl)
      .get('/ability?limit=10')
      .expect(200);

    // Assert response body structure
    expect(response.body).to.have.all.keys('count', 'next', 'previous', 'results');
    expect(response.body.results).to.be.an('array').with.lengthOf(10);
    response.body.results.forEach(ability => {
      expect(ability).to.have.property('name').that.is.a('string');
      expect(ability).to.have.property('url').that.is.a('string');
    });
  });

});
