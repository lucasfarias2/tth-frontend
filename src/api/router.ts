import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/test', (_req, res) => {
  res.send('Testing API GET endpoint');
});

apiRouter.use('*', (_req, res) => {
  res.send('Error 404: Page not found');
});

export default apiRouter;
