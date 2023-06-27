import type { NextFunction, Request, Response } from 'express';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.redirect('/account');
  }

  next();
};

const render = (req: Request, res: Response) => {
  res.renderView('signup', { device: req.device });
};

export default { render, fetch };
