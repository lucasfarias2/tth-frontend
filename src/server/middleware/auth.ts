import type { NextFunction, Request, Response } from 'express';
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

    req.user = { name: data.name, email: data.email, id: data.id, type: data.type };
    res.queries.user = req.user;
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
  if (req.user.type !== 'STAFF') {
    res.redirect('/');
  } else {
    next();
  }
};

export default { getCurrentUser, requireAuth, requireStaff };
