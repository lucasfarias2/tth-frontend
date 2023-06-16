import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextFunction, Request, Response } from 'express';
import EQueryKeys from '../../shared/queries/query-keys.js';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  const queryClient = new QueryClient();

  res.locals.initialState = dehydrate(queryClient);

  queryClient.clear();

  next();
};

const render = (req: Request, res: Response) => {
  res.loadQueryKeys([EQueryKeys.User]).renderView('account', { initialState: res.locals.initialState });
};

export default { render, fetch };
