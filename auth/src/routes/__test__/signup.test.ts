import request from 'supertest';
import { app } from '../../app';

it('should be returns a 201 on succesful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'passwordpasswordpassword'
    })
    .expect(201);
});
