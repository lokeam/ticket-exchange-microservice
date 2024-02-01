import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (request, response) => {
  response.send('testing from signin');
});

export { router as signinRouter };
