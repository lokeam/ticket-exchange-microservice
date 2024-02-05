import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (request, response) => {
  if (!request.session?.jwt) {
    return response.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(request.session.jwt, process.env.JWT_KEY!);

    response.send({ currentUser: payload });
  } catch(error) {
    console.log('current-user error: ', error);
    response.send(error);
    //response.send({ currentUser: null });
  }

});

export { router as currentUserRouter };
