import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import EQueryKeys from '../../shared/queries/query-keys.js';
import backofficeController from '../controllers/backofficeController.js';
import authMiddleware from '../middleware/auth.js';

const backofficeRouter = express.Router();

backofficeRouter.get(
  '/users',
  authMiddleware.getCurrentUser,
  authMiddleware.requireAuth,
  authMiddleware.requireStaff,
  async (req: Request, res: Response, next: NextFunction) => {
    const queryClient = new QueryClient();

    const response = await axios.get(`${process.env.BACKEND_URL}/backoffice/users/`, {
      headers: { Authorization: `Bearer ${req.cookies.session}` },
    });

    res.queries[EQueryKeys.Users] = response.data || {};

    res.locals.initialState = dehydrate(queryClient);

    queryClient.clear();

    next();
  },
  backofficeController.fetch,
  backofficeController.render
);

backofficeRouter.get(
  '/announcements',
  authMiddleware.getCurrentUser,
  authMiddleware.requireAuth,
  authMiddleware.requireStaff,
  async (req: Request, res: Response, next: NextFunction) => {
    const queryClient = new QueryClient();

    const response = await axios.get(`${process.env.BACKEND_URL}/backoffice/announcements/`, {
      headers: { Authorization: `Bearer ${req.cookies.session}` },
    });

    res.queries[EQueryKeys.Announcements] = response.data || {};

    res.locals.initialState = dehydrate(queryClient);

    queryClient.clear();

    next();
  },
  backofficeController.fetch,
  backofficeController.render
);

backofficeRouter.get(
  '/tickets',
  authMiddleware.getCurrentUser,
  authMiddleware.requireAuth,
  authMiddleware.requireStaff,
  async (req: Request, res: Response, next: NextFunction) => {
    const queryClient = new QueryClient();

    const response = await axios.get(`${process.env.BACKEND_URL}/backoffice/tickets/`, {
      headers: { Authorization: `Bearer ${req.cookies.session}` },
    });

    res.queries[EQueryKeys.Tickets] = response.data || {};

    res.locals.initialState = dehydrate(queryClient);

    queryClient.clear();

    next();
  },
  backofficeController.fetch,
  backofficeController.render
);

backofficeRouter.get(
  '*',
  authMiddleware.getCurrentUser,
  authMiddleware.requireAuth,
  authMiddleware.requireStaff,
  backofficeController.fetch,
  backofficeController.render
);

export default backofficeRouter;
