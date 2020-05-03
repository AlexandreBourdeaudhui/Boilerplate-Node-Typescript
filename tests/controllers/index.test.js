/*
 * Package Import
 */
import { should } from 'chai';
import request from 'supertest';
import status from 'http-status';

/*
 * Local Import
 */
import server from 'src/server';

/*
 * Init
 */
should();

/*
 * Tests
 */
describe('** Controllers - Index **', () => {
  it('should return 404', (done) => {
    request(server)
      .get('/fake/route')
      .expect(status.NOT_FOUND, done);
  });
});
