import type { NextFunction, Request, Response } from 'express';
import EQueryKeys from '../../shared/queries/query-keys.js';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  next();
};

const render = (req: Request, res: Response) => {
  res
    .loadQueryKeys([EQueryKeys.User])
    .renderView('home', { initialState: res.locals.initialState, device: req.device });
};

export default { render, fetch };
