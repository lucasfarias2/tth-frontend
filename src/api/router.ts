import express from 'express';
import authController from './controllers/authController.js';

const apiRouter = express.Router();

apiRouter.post('/login', authController.login);
apiRouter.post('/signup', authController.signup);
apiRouter.get('/logout', authController.logout);
apiRouter.get('/auth/user', authController.currentUser);

// goals
// objectives
// tasks
// home

apiRouter.use('*', (_req, res) => {
  res.send('Error 404: Page not found');
});

export default apiRouter;
