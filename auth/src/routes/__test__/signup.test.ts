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

it('returns a 400 if email is invalid', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'qwertyuiop',
      password: 'passwordpasswordpassword'
    })
    .expect(400);
});

it('returns a 400 if password not long enough', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'qwertyuiop',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 if user creds not supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);

    await request(app)
    .post('/api/users/signup')
    .send({
      password: 'passwordpasswordpassword'
    })
    .expect(400);
});

it('disallows signup with previously registered email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'passwordpasswordpassword'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'passwordpasswordpassword'
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'passwordpasswordpassword'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
