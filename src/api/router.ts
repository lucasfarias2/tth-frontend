import express from 'express';
import authController from './controllers/authController.js';
import backofficeController from './controllers/backofficeController.js';
import effortController from './controllers/effortController.js';
import habitController from './controllers/habitController.js';
import siteConfigController from './controllers/siteConfigController.js';
import statsController from './controllers/statsController.js';
import userController from './controllers/userController.js';

const apiRouter = express.Router();

apiRouter.post('/login', authController.login);
apiRouter.post('/signup', authController.signup);
apiRouter.get('/logout', authController.logout);
apiRouter.get('/auth/user', authController.currentUser);

apiRouter.patch('/user/profile', userController.updateProfile);

apiRouter.get('/site-config', siteConfigController.getSiteConfig);

apiRouter.get('/habits', habitController.getHabits);
apiRouter.post('/habits', habitController.createHabit);
apiRouter.get('/habits/:id', habitController.getHabitById);
apiRouter.patch('/habits/:id', habitController.editHabit);
apiRouter.delete('/habits/:id', habitController.deleteHabit);

apiRouter.get('/efforts/week/:week', effortController.getEffortsByWeek);
apiRouter.post('/efforts', effortController.createEffort);
apiRouter.patch('/efforts/:id', effortController.editEffort);

apiRouter.get('/stats/completion/:week', statsController.getWeekCompletion);
apiRouter.get('/stats/completion/:week/recent', statsController.getRecentCompletion);
apiRouter.get('/stats/performance/:habit', statsController.getHabitPerformance);
apiRouter.get('/stats/performance/global', statsController.getGlobalPerformance);

apiRouter.get('/backoffice/users', backofficeController.getUsers);
apiRouter.get('/backoffice/announcements', backofficeController.getAnnouncements);
apiRouter.get('/backoffice/tickets', backofficeController.getTickets);

apiRouter.use('*', (_req, res) => {
  res.send('Error 404: Page not found');
});

export default apiRouter;
