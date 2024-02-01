import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (request, response) => {
  response.send('testing from current-user');
});

export { router as currentUserRouter };
