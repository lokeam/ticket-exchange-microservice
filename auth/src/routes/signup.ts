import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (request, response) => {
  response.send('testing from signup');
});

export { router as signupRouter };
