import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (request, response) => {
  response.send('testing from signout');
});

export { router as signoutRouter };
