import type { NextFunction, Request, Response } from 'express';
import EQueryKeys from '../../shared/queries/query-keys.js';
import backendRestClient from '../backendRestClient.js';

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.session) {
    next();
    return;
  }

  try {
    const { data } = await backendRestClient.get('/auth/user', {
      headers: { Authorization: `Bearer ${req.cookies.session}` },
    });

    const { id, first_name, last_name, email, is_staff, is_superuser, date_joined, last_login } = data as TTHUser;

    req.user = { id, first_name, last_name, email, is_staff, is_superuser, date_joined, last_login };
    res.queries[EQueryKeys.User] = req.user;
  } catch {
    console.error('Error: Fetching data from current user');
  } finally {
    next();
  }
};

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

const requireStaff = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.is_staff) {
    res.redirect('/');
  } else {
    next();
  }
};

export default { getCurrentUser, requireAuth, requireStaff };
