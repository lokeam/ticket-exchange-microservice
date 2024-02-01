import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (request, response) => {
  response.send('Testing');
});

app.listen(3000, () => {
  console.log('Huzzah! Listening on port 3000!');
});

