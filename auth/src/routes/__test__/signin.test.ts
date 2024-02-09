import request from "supertest";
import { app } from '../../app';

it('should be returns a 200 on succesful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'passwordpasswordpassword'
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'passwordpasswordpassword'
    })
    .expect(200);
});

it('returns a 400 if email is invalid', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'qwertyuiop',
      password: 'passwordpasswordpassword'
    })
    .expect(400);
});

it('returns a 400 if password not long enough', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 if user creds not supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com'
    })
    .expect(400);

    await request(app)
    .post('/api/users/signin')
    .send({
      password: 'passwordpasswordpassword'
    })
    .expect(400);
});


it('fails when an email is not in db', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'emailnotindb@test.com',
      password: 'passwordpasswordpassword'
    })
    expect(400)
});

it('fails when incorrect password supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'passwordpasswordpassword'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'asdfjklqweruiop'
    })
    expect(400)
});

it('responds with a cookie when given valid login creds', async () => {
   await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'passwordpasswordpassword'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'passwordpasswordpassword'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
