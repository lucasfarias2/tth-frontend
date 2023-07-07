import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';
import EQueryKeys from '../../shared/queries/query-keys.js';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  const queryClient = new QueryClient();

  const siteConfigResponse = await axios.get(`${process.env.BACKEND_URL}/site-config/`, {
    headers: { Authorization: `Bearer ${req.cookies.session}` },
  });

  res.queries[EQueryKeys.SiteConfig] = siteConfigResponse.data || {};

  res.locals.initialState = dehydrate(queryClient);

  queryClient.clear();

  next();
};

const render = (req: Request, res: Response) => {
  res
    .loadQueryKeys([EQueryKeys.User, EQueryKeys.SiteConfig])
    .renderView('backoffice', { initialState: res.locals.initialState, device: req.device });
};

export default { render, fetch };
