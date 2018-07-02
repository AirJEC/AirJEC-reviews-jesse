const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../index.js');

const should = chai.should;

const endpoint = '/reviews/1';

chai.use(chaiHttp);

describe('Server', () => {
  describe('test', () => {
    it('Should get review data from PostgreSQL', (done) => {
      chai.request(server)
        .get(endpoint)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
