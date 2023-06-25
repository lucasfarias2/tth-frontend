import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextFunction, Request, Response } from 'express';
import EQueryKeys from '../../shared/queries/query-keys.js';
import backendRestClient from '../backendRestClient.js';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  const queryClient = new QueryClient();

  const siteConfigResponse = await backendRestClient.get('/site-config', {
    headers: { Authorization: `Bearer ${req.cookies.session}` },
  });

  if (siteConfigResponse.data) {
    res.queries[EQueryKeys.SiteConfig] = siteConfigResponse.data;
  }

  res.locals.initialState = dehydrate(queryClient);

  queryClient.clear();

  next();
};

const render = (req: Request, res: Response) => {
  res
    .loadQueryKeys([EQueryKeys.User, EQueryKeys.SiteConfig])
    .renderView('account', { initialState: res.locals.initialState });
};

export default { render, fetch };
