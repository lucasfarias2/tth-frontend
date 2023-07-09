import express from 'express';
import authController from './controllers/authController.js';
import backofficeController from './controllers/backofficeController.js';
import effortController from './controllers/effortController.js';
import featuresController from './controllers/featuresController.js';
import habitController from './controllers/habitController.js';
import siteConfigController from './controllers/siteConfigController.js';
import statsController from './controllers/statsController.js';
import ticketsController from './controllers/ticketsController.js';
import userController from './controllers/userController.js';

const apiRouter = express.Router();

apiRouter.post('/login', authController.login);
apiRouter.post('/signup', authController.signup);
apiRouter.get('/logout', authController.logout);
apiRouter.get('/auth/user', authController.currentUser);

apiRouter.patch('/user/profile', userController.updateProfile);

apiRouter.get('/site-config', siteConfigController.getSiteConfig);

apiRouter.get('/features', featuresController.getFeatures);

apiRouter.post('/tickets', ticketsController.createTicket);

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
apiRouter.post('/backoffice/announcements', backofficeController.createAnnouncement);
apiRouter.get('/backoffice/announcements/:id', backofficeController.getAnnouncementById);
apiRouter.patch('/backoffice/announcements/:id', backofficeController.editAnnouncement);
apiRouter.delete('/backoffice/announcements/:id', backofficeController.deleteAnnouncement);

apiRouter.get('/backoffice/tickets', backofficeController.getTickets);
apiRouter.get('/backoffice/tickets/:id', backofficeController.getTicketById);
apiRouter.post('/backoffice/tickets', backofficeController.createTicket);
apiRouter.patch('/backoffice/tickets/:id', backofficeController.editTicket);

apiRouter.get('/backoffice/features', backofficeController.getFeatures);
apiRouter.post('/backoffice/features', backofficeController.createFeature);
apiRouter.get('/backoffice/features/:id', backofficeController.getFeatureById);
apiRouter.patch('/backoffice/features/:id', backofficeController.editFeature);
apiRouter.delete('/backoffice/features/:id', backofficeController.deleteFeature);

apiRouter.use('*', (_req, res) => {
  res.send('Error 404: Page not found');
});

export default apiRouter;
