import express from 'express';
import authController from './controllers/authController.js';
import effortController from './controllers/effortController.js';
import habitController from './controllers/habitController.js';

const apiRouter = express.Router();

apiRouter.post('/login', authController.login);
apiRouter.post('/signup', authController.signup);
apiRouter.get('/logout', authController.logout);
apiRouter.get('/auth/user', authController.currentUser);

apiRouter.get('/habits', habitController.getHabits);
apiRouter.post('/habits', habitController.createHabit);
apiRouter.get('/habits/:id', habitController.getHabitById);
apiRouter.patch('/habits/:id', habitController.editHabit);
apiRouter.delete('/habits/:id', habitController.deleteHabit);

apiRouter.get('/efforts/week/:week', effortController.getEffortsByWeek);

apiRouter.use('*', (_req, res) => {
  res.send('Error 404: Page not found');
});

export default apiRouter;
